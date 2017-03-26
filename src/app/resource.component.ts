import { Component, Input } from '@angular/core';

import { Resource } from './resource';
import { ResourceManagementService } from './resource-management.service';

@Component({
  selector: 'resource',
  template: `
  <div>
    <h3>{{resource.display}}</h3>
    <span>{{engine.getResourceCount(resource)}}</span> <label>{{resource.pluralText}}</label>
    <button *ngIf="resource.craftText" [disabled]="!engine.isResourceCraftable(resource)" (click)="engine.craftResource(resource)">{{resource.craftText}}</button>
    <button *ngIf="resource.destroyText" [disabled]="!engine.resourceHasVolume(resource)" (click)="engine.destroyResource(resource)">{{resource.destroyText}}</button>
  </div>`
})

export class ResourceComponent {
  @Input() resource: Resource;

  constructor(public engine: ResourceManagementService) {}
}
