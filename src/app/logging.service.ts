import { Injectable, isDevMode } from '@angular/core';
import { PushNotificationsService } from 'angular2-notifications';

@Injectable()
export class LoggingService {
  public lines: { date: Date, msg: string, important: boolean }[] = [];

  constructor(private pushNotifications: PushNotificationsService) {}

  append(msg: string, important?: boolean): void {
    this.lines.push({
      date: new Date(),
      msg: msg,
      important: important
    });
    if(important) this.notify(msg);
  }

  debug(msg: string): void {
    console.log(msg);
    if(isDevMode()) this.lines.push({
      date: new Date(),
      msg: msg,
      important: false
    });
  }

  lastLines(count: number): { date: Date, msg: string }[] {
    var end = this.lines.length;
    var start = end - count;
    if(start < 0) start = 0;
    return this.lines.slice(start, end);
  }

  clear(): boolean {
    this.lines = [];
    return false;
  }

  notify(msg: string): void {
    var options = { body: msg };
    this.pushNotifications.create('Code Monkey Tycoon', options).subscribe();
  }
}
