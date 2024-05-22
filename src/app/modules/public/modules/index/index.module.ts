import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

// Modules
import { CoreModule } from 'src/app/modules/core/core.module';

@NgModule({
  declarations: [
    LoginUserComponent,
    RegisterUserComponent,
    VerifyUserComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class IndexModule { }
