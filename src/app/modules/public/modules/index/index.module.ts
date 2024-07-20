import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserVerifyComponent } from './components/user-verify/user-verify.component';
import { CoreModule } from 'src/app/modules/core/core.module';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    UserVerifyComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class IndexModule { }
