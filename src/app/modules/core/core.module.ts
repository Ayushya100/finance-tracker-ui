import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { UserFormComponent } from './components/user-form/user-form.component';

// Modules
import { SharedModule } from '../shared/shared.module';
import { UserDetailsFormComponent } from './components/user-details-form/user-details-form.component';

@NgModule({
  declarations: [
    UserFormComponent,
    UserDetailsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [],
  exports: [
    UserFormComponent,
    UserDetailsFormComponent
  ]
})
export class CoreModule { }
