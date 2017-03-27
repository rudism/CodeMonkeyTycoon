import { Component, Input } from '@angular/core';

import { Resource } from './resource';
import { GameEngineService } from './game-engine.service';
import { AmountPipe } from './amount.pipe';

@Component({
  selector: 'resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})

export class ResourceComponent {
  @Input() resource: Resource;
  @Input() skipFlash: boolean;
  expanded: boolean = false;
  savedCost: boolean = null;
  private costs: { name: string, amount: string }[] = null;

  constructor(public engine: GameEngineService) {}

  toggleMore(): void {
    this.expanded = !this.expanded;
  }

  hasCost(): boolean {
    if(this.savedCost != null) return this.savedCost;

    if(!this.resource.value){
      this.savedCost = false;
      return false;
    }

    for(var key in this.resource.value){
      if(this.engine.resources[key].display && this.resource.value[key] < 0){
        this.savedCost = true;
        return true;
      }
    }

    this.savedCost = false;
    return false;
  }

  getCosts(): { [name: string]: string }[] {
    var amtpipe = new AmountPipe(this.engine);
    if(this.costs != null) return this.costs;
    if(!this.resource.value) return [];

    this.costs = [];
    for(var key in this.resource.value){
      if(this.resource.value[key] > 0) continue;
      var cres = this.engine.resources[key];
      if(!cres.display) continue;

      var amount = amtpipe.transform(this.resource.value[key] * -1, cres.pluralText, false);
      var suffix = amtpipe.transform(this.resource.value[key] * -1, cres.pluralText, true);
      this.costs.push({ name: cres.display, amount: `${ cres.prefix ? cres.prefix : '' }${ amount } ${ suffix }` });
    }
    return this.costs;
  }
}
