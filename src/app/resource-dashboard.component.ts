import { Component } from '@angular/core';

import { GameEngineService } from './game-engine.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'resource-dashboard',
  templateUrl: './resource-dashboard.component.html',
  styleUrls: ['./resource-dashboard.component.css']
})

export class ResourceDashboardComponent {
  constructor(
    public engine: GameEngineService,
    public log: LoggingService) {}
}
