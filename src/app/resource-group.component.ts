import { Component, Input } from '@angular/core';

import { ResourceGroup } from './resource-group';
import { GameEngineService } from './game-engine.service';

@Component({
  selector: 'resource-group',
  templateUrl: './resource-group.component.html',
  styleUrls: ['./resource-group.component.css']
})

export class ResourceGroupComponent implements AfterViewInit {
  @Input() group: ResourceGroup;
  @Input() skipFlash: boolean;

  constructor(public engine: GameEngineService) {}
}
