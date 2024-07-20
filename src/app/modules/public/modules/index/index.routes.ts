import { Routes } from '@angular/router';

// Components
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserVerifyComponent } from './components/user-verify/user-verify.component';
import { SystemSetupResolver } from '../../guards/system-setup.resolver';

export const PublicIndexRoutes: Routes = [
    {
        path: 'register-user', component: UserRegisterComponent,
        pathMatch: 'full'
    },
    {
        path: 'login-user', component: UserLoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'verify-user/:userId/code', component: UserVerifyComponent,
        pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'login-user'
    }
];
