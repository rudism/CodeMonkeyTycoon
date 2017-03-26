import { Component, Input } from '@angular/core';

import { ResourceGroup } from './resource-group';
import { ResourceManagementService } from './resource-management.service';

@Component({
  selector: 'resource-group',
  template: `
  <h2>{{group.name}}</h2>
  <ul>
    <li *ngFor="let resource of engine.getVisibleResources(group)">
      <resource *ngIf="engine.isResourceVisible(resource)" [resource]="resource"></resource>
    </li>
  </ul>
  `
})

export class ResourceGroupComponent {
  @Input() group: ResourceGroup;

  constructor(public engine: ResourceManagementService) {}
}
