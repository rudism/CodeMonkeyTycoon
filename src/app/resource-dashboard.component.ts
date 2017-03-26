import { Component } from '@angular/core';

import { ResourceManagementService } from './resource-management.service';

@Component({
  selector: 'resource-dashboard',
  template: `
    <div *ngFor="let group of engine.getVisibleGroups()">
      <resource-group [group]="group"></resource-group>
    </div>
  `
})

export class ResourceDashboardComponent {
  constructor(public engine: ResourceManagementService) {}
}
