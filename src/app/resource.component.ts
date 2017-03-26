import { Component, Input } from '@angular/core';

import { Resource } from './resource';
import { GameEngineService } from './game-engine.service';

@Component({
  selector: 'resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})

export class ResourceComponent {
  @Input() resource: Resource;

  constructor(public engine: GameEngineService) {}
}
