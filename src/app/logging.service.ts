import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class LoggingService {
  public lines: { date: Date, msg: string }[] = [];

  append(msg: string): void {
    this.lines.push({
      date: new Date(),
      msg: msg
    });
  }

  debug(msg: string): void {
    console.log(msg);
    if(isDevMode()) this.lines.push({
      date: new Date(),
      msg: msg
    });
  }

  lastLines(count: number): { date: Date, msg: string }[] {
    var end = this.lines.length;
    var start = end - count;
    if(start < 0) start = 0;
    return this.lines.slice(start, end);
  }

  clear(): void {
    this.lines = [];
  }
}
