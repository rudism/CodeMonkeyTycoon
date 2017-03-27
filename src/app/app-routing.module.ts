import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceComponent } from './resource.component';
import { ResourceDashboardComponent } from './resource-dashboard.component';
import { LogHistoryComponent } from './log-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ResourceDashboardComponent },
  { path: 'history', component: LogHistoryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
