import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSetupComponent } from './components/user-setup/user-setup.component';

// Services
import { UserService } from './services/user.service';
import { CoreModule } from 'src/app/modules/core/core.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserSetupComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    UserService
  ]
})
export class UserProfileModule { }
