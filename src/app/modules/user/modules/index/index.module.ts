import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { UserHomeComponent } from './components/user-home/user-home.component';

// Modules
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class IndexModule { }
