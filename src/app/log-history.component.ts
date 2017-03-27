import { Component } from '@angular/core';

import { LoggingService } from './logging.service';

@Component({
  selector: 'log-history',
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.css']
})

export class LogHistoryComponent {
  constructor(public log: LoggingService) {}
}
