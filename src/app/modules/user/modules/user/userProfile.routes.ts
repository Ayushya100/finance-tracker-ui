import { Routes } from '@angular/router';

// Components
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSetupComponent } from './components/user-setup/user-setup.component';

import { UserResolver } from '../../guards/user.resolver';
import { AuthGuard } from '../../guards/auth-guard.guard';

export const userProfileRoutes: Routes = [
    {
        path: 'user-profile', component: UserProfileComponent, resolve: { userInfo: UserResolver },
        canActivate: [AuthGuard], data: { userScope: 'USER.V' }, runGuardsAndResolvers: 'always'
    },
    {
        path: 'user-setup', component: UserSetupComponent, resolve: { userInfo: UserResolver },
        canActivate: [AuthGuard], data: { userScope: 'USER.V' }, runGuardsAndResolvers: 'always'
    }
];
