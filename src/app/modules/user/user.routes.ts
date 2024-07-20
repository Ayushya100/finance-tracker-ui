import { Routes } from '@angular/router';

// Components
import { CoreComponent } from './components/core/core.component';

// Routes
import { userIndexRoutes } from './modules/index/index.routes';
import { userProfileRoutes } from './modules/user/userProfile.routes';
import { userDashboardRoutes } from './modules/dashboard/dashboard.routes';
import { paymentRoutes } from './modules/payment options/payment.routes';

export const userRoutes: Routes = [
    {
        path: 'user/:userId', component: CoreComponent,
        children: [
            ...userIndexRoutes,
            ...paymentRoutes,
            ...userProfileRoutes,
            ...userDashboardRoutes
        ]
    }
];
