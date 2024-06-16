import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Services
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/authInterceptor.service';

// Component
import { CoreComponent } from './components/core/core.component';

// Modules
import { SharedModule } from '../shared/shared.module';
import { UserProfileModule } from './modules/user/userProfile.module';
import { IndexModule } from './modules/index/index.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

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
    DashboardModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class UserModule { }
