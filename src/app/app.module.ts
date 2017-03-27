import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ResourceComponent } from './resource.component';
import { ResourceGroupComponent } from './resource-group.component';
import { ResourceDashboardComponent } from './resource-dashboard.component';
import { LogHistoryComponent } from './log-history.component';

import { GameEngineService } from './game-engine.service';
import { LoggingService } from './logging.service';

import { AmountPipe } from './amount.pipe';
import { KeysPipe } from './keys.pipe';

import { AppRoutingModule } from './app-routing.module';
import { PushNotificationsModule } from 'angular2-notifications';
import { NewElementDirective } from './new-element.directive';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    PushNotificationsModule
  ],
  declarations: [
    AppComponent,
    ResourceComponent,
    ResourceGroupComponent,
    ResourceDashboardComponent,
    LogHistoryComponent,
    NewElementDirective,
    AmountPipe,
    KeysPipe
  ],
  providers: [
    GameEngineService,
    LoggingService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
