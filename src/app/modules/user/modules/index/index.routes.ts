import { Routes } from '@angular/router';

// Component
import { UserHomeComponent } from './components/user-home/user-home.component';

import { AuthGuard } from '../../guards/auth-guard.guard';
import { UserResolver } from '../../guards/user.resolver';

export const userIndexRoutes: Routes = [
    {
        path: '', component: UserHomeComponent, resolve: { userInfo: UserResolver },
        canActivate: [AuthGuard], data: { userScope: 'USER.V' }, runGuardsAndResolvers: 'always'
    }
];
