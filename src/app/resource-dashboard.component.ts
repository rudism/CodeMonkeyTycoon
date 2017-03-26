import { Component } from '@angular/core';

import { GameEngineService } from './game-engine.service';

@Component({
  selector: 'resource-dashboard',
  template: `
    <div *ngFor="let group of engine.getVisibleGroups()">
      <resource-group [group]="group"></resource-group>
    </div>
  `
})

export class ResourceDashboardComponent {
  constructor(public engine: GameEngineService) {}
}
