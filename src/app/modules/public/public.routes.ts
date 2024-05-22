import { Routes } from '@angular/router';

// Component
import { CoreComponent } from './components/core/core.component';

// Module
import { PublicIndexRoutes } from './modules/index/index.routes';
import { SystemSetupResolver } from './guards/system-setup.resolver';

export const publicRoutes: Routes = [
    {
        path: '', component: CoreComponent, resolve: { setup: SystemSetupResolver },
        children: [
            ...PublicIndexRoutes
        ]
    },
    {
        path: '**', redirectTo: 'register-user'
    }
];
