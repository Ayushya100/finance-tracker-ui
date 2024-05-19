import { Routes } from '@angular/router';

// Components
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';

export const publicRoutes: Routes = [
    {
        path: 'register-user', component: RegisterUserComponent,
        pathMatch: 'full'
    },
    {
        path: 'verify-user/:userId/:code', component: VerifyUserComponent,
        pathMatch: 'full'
    },
    {
        path: 'signup-user', component: LoginUserComponent,
        pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'register-user'
    }
];
