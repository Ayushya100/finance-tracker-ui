import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { UserFormComponent } from './components/user-form/user-form.component';

// Modules
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [],
  exports: [
    UserFormComponent
  ]
})
export class CoreModule { }
