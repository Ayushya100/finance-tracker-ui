import { Routes } from '@angular/router';

// Components
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';

export const PublicIndexRoutes: Routes = [
    {
        path: 'register-user', component: RegisterUserComponent,
        pathMatch: 'full'
    },
    {
        path: 'verify-user/:userId/:code', component: VerifyUserComponent,
        pathMatch: 'full'
    },
    {
        path: 'login-user', component: LoginUserComponent,
        pathMatch: 'full'
    }
];
