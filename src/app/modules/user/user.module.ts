import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Component
import { CoreComponent } from './components/core/core.component';

// Services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

// Modules
import { SharedModule } from '../shared/shared.module';
import { UserProfileModule } from './modules/user/userProfile.module';
import { IndexModule } from './modules/index/index.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PaymentModule } from './modules/payment options/payment.module';

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    UserProfileModule,
    IndexModule,
    DashboardModule,
    PaymentModule
  ],
  providers: [
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class UserModule { }
