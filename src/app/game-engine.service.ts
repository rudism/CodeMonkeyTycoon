import { Injectable } from '@angular/core';

import { Resource, ResourceMap } from './resource';
import { ResourceGroup } from './resource-group';
import { RESOURCEDEF, STARTINVENTORY } from './resource-definitions';

@Injectable()
export class GameEngineService {
  groups = RESOURCEDEF;
  resources: { [name: string]: Resource } = {};
  processOrder: string[] = [];
  crafted: ResourceMap = {};
  totals: ResourceMap = {};
  globals: ResourceMap = {};

  constructor() {
    var unresolved: { [name: string]: string[] } = {};
    for(var group of this.groups){
      for(var resource of group.resources){
        this.resources[resource.name] = resource;
        unresolved[resource.name] = resource.value ? Object.keys(resource.value) : [];
      }
    }

    // build processing order based on dependency graph
    var count = Object.keys(unresolved).length;
    while(Object.keys(unresolved).length > 0){
      var removed = 0;
      for(var key in unresolved){
        if(unresolved[key].length === 0){
          removed++;
          this.processOrder.unshift(key);
          delete unresolved[key];
          for(var updkey in unresolved){
            var depidx = unresolved[updkey].indexOf(key);
            if(depidx >= 0){
              unresolved[updkey].splice(depidx, 1);
            }
          }
        }
      }
      count--;
      if(Object.keys(unresolved).length > 0 && (removed === 0 || count < 0)){
        throw new Error("could not resolve resource dependency graph");
      }
    }

    // give starting inventory
    for(var name in STARTINVENTORY){
      this.incCrafted(name, STARTINVENTORY[name]);
    }

    this.performTick();
  }

  private performTick(): void {
    // handle generators
    var generated: ResourceMap = {};
    for(var name of this.processOrder){
      if(!this.totals[name] || !this.resources[name].generators || this.totals[name] === 0) continue;
      for(var key in this.resources[name].generators){
        if(!generated[key]) generated[key] = 0;
        generated[key] += this.totals[name] * this.resources[name].generators[key];
      }
    }
    for(var key in generated) this.incCrafted(key, generated[key]);

    this.totals = this.getResourceTotals();

    // handle negative totals
    for(var name in this.totals){
      if(this.totals[name] >= 0) continue;

      console.log('attritioning', name);

      // reduce all attritionable resources that depend on this one
      var deps: ResourceMap = {};
      var totalDeps = 0;
      for(var key in this.resources){
        if(name === key) continue;
        if(!this.resources[key].attritionable) continue;
        if(this.crafted[key] <= 0) continue;
        if(!this.resources[key].value) continue;
        if(!this.resources[key].value[name] || this.resources[key].value[name] > 0) continue;
        deps[key] = this.resources[key].value[name] * this.totals[key];
        totalDeps += deps[key];
      }
      // total reduction will be 1/2 of discrepancy
      var totalReduction = this.totals[name] * -0.5;
      for(var key in deps){
        this.crafted[key] -= totalReduction * (deps[key] / totalDeps);
        if(this.crafted[key] < 0.01) this.crafted[key] = 0;
      }
    }

    setTimeout(() => this.performTick(), 100);
  }

  private getResourceTotals(): ResourceMap {
    var totals: ResourceMap = {};
    for(var name of this.processOrder){
      if(!totals[name]) totals[name] = 0;
      if(this.crafted[name]) totals[name] += this.crafted[name];
      if(totals[name] === 0 || !this.resources[name].value) continue;
      for(var key in this.resources[name].value){
        if(!totals[key]) totals[key] = 0;
        totals[key] += totals[name] * this.resources[name].value[key];
      }
    }
    return totals;
  }

  private isResourceVisible(resource: Resource): boolean {
    if(!resource.display) return false;
    if(!resource.requirements) return true;
    var visible = true;
    for(var key in resource.requirements){
      if(!this.globals[key]){ visible = false; break; }
      if(this.globals[key] < resource.requirements[key]){ visible = false; break; }
    }
    return visible;
  }

  private incCrafted(name: string, amount: number = 1): void {
    if(!this.crafted[name]) this.crafted[name] = 0;
    if(!this.globals[name]) this.globals[name] = 0;
    this.crafted[name] += amount;
    if(this.crafted[name] < 0) this.crafted[name] = 0;
    if(amount > 0) this.globals[name] += amount;
  }

  craftResource(resource: Resource, amount: number = 1): void {
    if(!this.isResourceCraftable(resource, amount)) return;
    this.incCrafted(resource.name, amount);
  }

  destroyResource(resource: Resource, amount: number = 1): void {
    if(!this.crafted[resource.name]) return;
    this.incCrafted(resource.name, amount * -1);
    if(!resource.value) return;
    for(var key in resource.value){
      if(this.resources[key].restorable) continue;
      this.destroyResource(this.resources[key], resource.value[key] * amount * -1);
    }
  }

  getResourceCount(resource: Resource): number {
    if(!this.totals[resource.name]) return 0;
    return this.totals[resource.name];
  }

  isResourceCraftable(resource: Resource, amount: number = 1): boolean {
    if(!resource.craftText) return false;
    var craftable = true;
    for(var key in resource.value){
      if(resource.value[key] > 0) continue;
      if(!this.totals[key]){ craftable = false; break; }
      if(this.totals[key] < resource.value[key] * amount * -1){ craftable = false; break; }
    }
    return craftable;
  }

  getVisibleResources(group: ResourceGroup): Resource[] {
    var visible: Resource[] = [];
    for(var resource of group.resources){
      if(this.isResourceVisible(resource)) visible.push(resource);
    }
    return visible;
  }

  getVisibleGroups(): ResourceGroup[] {
    var visible: ResourceGroup[] = [];
    var totals = this.getResourceTotals();
    for(var group of this.groups) {
      var isVisible = false;
      for(var resource of group.resources){
        if(this.isResourceVisible(resource)){
          isVisible = true;
          break;
        }
      }
      if(isVisible) visible.push(group);
    }
    return visible;
  }
}
