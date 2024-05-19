import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

// Components
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

// Service
import { PublicService } from './services/public.service';

@NgModule({
  declarations: [
    RegisterUserComponent,
    VerifyUserComponent
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
