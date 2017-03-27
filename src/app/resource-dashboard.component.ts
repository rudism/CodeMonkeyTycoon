import { Component, AfterViewInit } from '@angular/core';

import { GameEngineService } from './game-engine.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'resource-dashboard',
  templateUrl: './resource-dashboard.component.html',
  styleUrls: [
    './resource-dashboard.component.css',
    './log-history.component.css'
  ]
})

export class ResourceDashboardComponent implements AfterViewInit {
  skipFlash: boolean = true;

  constructor(
    public engine: GameEngineService,
    public log: LoggingService) {}

  ngAfterViewInit(): void {
    this.skipFlash = false;
  }
}
