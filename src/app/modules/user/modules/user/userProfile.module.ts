import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSetupComponent } from './components/user-setup/user-setup.component';
import { UserSetupFormComponent } from './components/user-setup-form/user-setup-form.component';

// Services
import { UserGeneralService } from './services/user.service';

// Modules
import { CoreModule } from 'src/app/modules/core/core.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserSetupComponent,
    UserSetupFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    UserGeneralService
  ]
})
export class UserProfileModule { }
