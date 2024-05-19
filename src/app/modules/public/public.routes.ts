import { Routes } from '@angular/router';

// Components
import { RegisterUserComponent } from './components/register-user/register-user.component';

export const publicRoutes: Routes = [
    {
        path: 'register-user', component: RegisterUserComponent,
        pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'register-user'
    }
];
