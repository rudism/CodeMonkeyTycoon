import { Injectable } from '@angular/core';

import { LoggingService } from './logging.service';

import { Resource, ResourceMap } from './resource';
import { ResourceGroup } from './resource-group';
import { ResourceMeta } from './resource-meta';
import { RESOURCEDEF, STARTINVENTORY } from './resource-definitions';

@Injectable()
export class GameEngineService {
  groups = RESOURCEDEF;
  public resource: { [name: string]: ResourceMeta } = {};
  valueOrder: string[] = [];
  reverseValueOrder: string[] = [];
  generatorOrder: string[] = [];
  private resetting: boolean = false;

  constructor(public log: LoggingService) {
    this.init();
  }

  private calculateOrder(unresolved: { [name: string]: string[] }): string[] {
    // build processing order based on dependency graph
    var order: string[] = [];
    var count = Object.keys(unresolved).length;
    while(Object.keys(unresolved).length > 0){
      var removed = 0;
      for(var key in unresolved){
        if(unresolved[key].length === 0){
          removed++;
          order.unshift(key);
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
    return order;
  }

  private init(){
    this.log.debug('Game engine initializing.');

    this.resource = {};
    this.valueOrder = [];
    this.reverseValueOrder = [];
    this.generatorOrder = [];
    this.resetting = false;

    var values: { [name: string]: string[] } = {};
    var generators: { [name: string]: string[] } = {};
    for(var group of this.groups){
      for(var resource of group.resources){
        this.resource[resource.name] = new ResourceMeta(resource, this.resource);
        values[resource.name] = resource.value
          ? Object.keys(resource.value) : [];
        generators[resource.name] = resource.generators
          ? Object.keys(resource.generators) : [];
      }
    }

    // build processing order based on dependency graph
    this.valueOrder = this.calculateOrder(values);
    this.reverseValueOrder = this.valueOrder.slice().reverse();
    this.generatorOrder = this.calculateOrder(generators).reverse();

    console.log('generatorOrder', this.generatorOrder);

    // give starting inventory
    for(var name in STARTINVENTORY){
      this.resource[name].incCrafted(STARTINVENTORY[name], STARTINVENTORY);
    }

    this.log.debug('Game engine initialized.');
    this.log.append("You know HTML and Javascript. Try writing some code!", true);
    this.performTick();
  }

  private addValuesToTotal(amount: number, values: ResourceMap, totals: ResourceMap, first: boolean){
    for(let key in values){
      if(!totals[key]) totals[key] = 0;
      if(first || !this.resource[key].restorable)
        totals[key] += amount * values[key];
      if(!this.resource[key].value) continue;
      this.addValuesToTotal(amount * values[key] * -1, this.resource[key].value, totals, false);
    }
  }

  private performTick(): void {
    if(this.resetting){
      this.log.append("Time for a pivot!", true);
      this.init();
      return;
    }

    // calculated generated amounts and total modifier effects
    var generated: ResourceMap = {};
    var valueGen: ResourceMap = {};
    var modified: ResourceMap = {};
    for(var name of this.generatorOrder){
      this.resource[name].maxed = false;
      if((!this.resource[name].generators && !this.resource[name].modifiers) || this.resource[name].total === 0) continue;
      let apply = this.resource[name].maxGeneratorApply(generated);
      if(this.resource[name].generators){
        for(var key in this.resource[name].generators){
          if(!generated[key]) generated[key] = 0;
          generated[key] += apply * this.resource[name].generators[key];
        }
      }
      if(this.resource[name].modifiers){
        if(apply > 1){
          for(var key in this.resource[name].modifiers){
            let amount = Math.abs(generated[key] - (generated[key] * Math.pow(this.resource[name].modifiers[key], apply)));
            if(!modified[key]) modified[key] = 0;
            modified[key] += amount;
          }
        }
      }
    }
    // apply modifier effects to generated amounts
    for(var key in modified){
      if(!generated[key]) continue;
      generated[key] -= modified[key];
    }
    // add modified amounts to totals
    for(var key in generated){
      if(this.resource[key].incCrafted(generated[key])){
        if(!this.resource[key].value) continue;
        this.addValuesToTotal(generated[key], this.resource[key].value, valueGen, true);
      } else {
        this.resource[key].maxed = true;
        generated[key] = 0;
      }
    }

    // update totals and deltas on resources
    let totals: ResourceMap = {};
    for(let name of this.valueOrder){
      this.resource[name].delta = (generated[name] ? generated[name] : 0) + (valueGen[name] ? valueGen[name] : 0);
      if(!totals[name]) totals[name] = 0;
      totals[name] += this.resource[name].crafted;

      if(totals[name] === 0 || !this.resource[name].value) continue;
      this.addValuesToTotal(totals[name], this.resource[name].value, totals, true);
    }
    for(let key in totals){
      this.resource[key].total = totals[key];
    }

    // handle negative totals
    for(var name in this.resource){
      if(this.resource[name].total >= 0) continue;

      // reduce all attritionable resources that depend on this one
      var deps: ResourceMap = {};
      var totalDeps = 0;
      for(var key of this.valueOrder){
        if(name === key) continue;
        if(!this.resource[key].attritionable) continue;
        if(this.resource[key].crafted <= 0) continue;
        if(!this.resource[key].value) continue;
        if(!this.resource[key].value[name] || this.resource[key].value[name] > 0) continue;
        deps[key] = this.resource[key].value[name] * this.resource[key].total;
        totalDeps += deps[key];
      }
      // total reduction will be 1/2 of discrepancy
      var totalReduction = this.resource[name].total * -0.5;
      for(var key in deps){
        this.resource[key].crafted -= totalReduction * (deps[key] / totalDeps);
        if(this.resource[key].crafted < 0.01) this.resource[key].crafted = 0;
      }
    }

    setTimeout(() => this.performTick(), 100);
  }

  craftResource(resource: ResourceMeta, amount: number = 1): void {
    if(!resource.isCraftable(amount)) return;
    resource.incCrafted(amount);
    this.log.append(`Added ${ amount } ${ resource.display }.`);
  }

  destroyResource(resource: ResourceMeta, amount: number = 1, quiet?: boolean): void {
    resource.incCrafted(amount * -1);
    if(!resource.value) return;
    for(var key in resource.value){
      if(this.resource[key].restorable) continue;
      this.destroyResource(this.resource[key], resource.value[key] * amount * -1, true);
    }
    if(!quiet) this.log.append(`Removed ${ amount } ${ resource.display }.`);
  }

  private resourceVisible(resource: Resource): boolean {
    let rv = this.resource[resource.name].isVisible();
    if(rv.visible && rv.first && resource.appearText){
      this.log.append(resource.appearText, true);
    }
    return rv.visible;
  }

  getVisibleResources(group: ResourceGroup): ResourceMeta[] {
    let visible: ResourceMeta[] = [];
    for(let resource of group.resources){
      if(this.resourceVisible(resource))
        visible.push(this.resource[resource.name]);
    }
    return visible;
  }

  getVisibleGroups(): ResourceGroup[] {
    var visible: ResourceGroup[] = [];
    for(var group of this.groups) {
      var isVisible = false;
      for(var resource of group.resources){
        if(this.resourceVisible(resource)){
          isVisible = true;
          break;
        }
      }
      if(isVisible) visible.push(group);
    }
    return visible;
  }

  reset(): void {
    this.resetting = true;
  }
}
