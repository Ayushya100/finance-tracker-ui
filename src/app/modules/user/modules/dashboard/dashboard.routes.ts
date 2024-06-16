import { Routes } from '@angular/router';

// Component
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

import { UserResolver } from '../../guards/user.resolver';
import { AuthGuard } from '../../guards/auth-guard.guard';

export const userDashboardRoutes: Routes = [
    {
        path: 'dashboard', component: UserDashboardComponent, resolve: { userInfo: UserResolver },
        canActivate: [AuthGuard], data: { userScope: 'SETUP.V' }, runGuardsAndResolvers: 'always'
    }
];
