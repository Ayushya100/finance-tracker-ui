import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Services
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/authInterceptor.service';

// Component
import { CoreComponent } from './components/core/core.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
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
