import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

// Modules
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
