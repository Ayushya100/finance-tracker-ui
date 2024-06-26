import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { UserHomeComponent } from './components/user-home/user-home.component';
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
