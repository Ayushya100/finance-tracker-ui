import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

// Components
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';

// Service
import { PublicService } from './services/public.service';

@NgModule({
  declarations: [
    RegisterUserComponent,
    VerifyUserComponent,
    LoginUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    PublicService
  ]
})
export class PublicModule { }
