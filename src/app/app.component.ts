import { Component } from '@angular/core';
import { PushNotificationsService } from 'angular2-notifications';
import { GameEngineService } from './game-engine.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private pushNotifications: PushNotificationsService,
    public engine: GameEngineService
  ){
    pushNotifications.requestPermission();
  }
}
