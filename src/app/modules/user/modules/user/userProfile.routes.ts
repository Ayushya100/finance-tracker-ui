import { Routes } from '@angular/router';

// Components
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { UserResolver } from '../../guards/user.resolver';
import { AuthGuard } from '../../guards/auth-guard.guard';

export const userProfileRoutes: Routes = [
    {
        path: 'user-profile', component: UserProfileComponent, resolve: { userInfo: UserResolver },
        canActivate: [AuthGuard], data: { userScope: 'USER.V' }, runGuardsAndResolvers: 'always'
    }
];
