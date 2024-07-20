import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsFormComponent } from './components/user-details-form/user-details-form.component';
import { CoreButtonComponent } from './components/custom-components/core-button/core-button.component';
import { CoreDropdownComponent } from './components/custom-components/core-dropdown/core-dropdown.component';

// Modules
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserFormComponent,
    UserDetailsFormComponent,
    CoreButtonComponent,
    CoreDropdownComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [],
  exports: [
    UserFormComponent,
    UserDetailsFormComponent,
    CoreButtonComponent,
    CoreDropdownComponent
  ]
})
export class CoreModule { }
