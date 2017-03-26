import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ResourceComponent } from './resource.component';
import { ResourceGroupComponent } from './resource-group.component';
import { ResourceDashboardComponent } from './resource-dashboard.component';

import { GameEngineService } from './game-engine.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ResourceComponent,
    ResourceGroupComponent,
    ResourceDashboardComponent
  ],
  providers: [
    GameEngineService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
