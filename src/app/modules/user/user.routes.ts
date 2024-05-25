import { Routes } from '@angular/router';

// Components
import { CoreComponent } from './components/core/core.component';

// Modules
import { userIndexRoutes } from './modules/index/index.routes';

export const userRoutes: Routes = [
    {
        path: 'user', component: CoreComponent,
        children: [
            ...userIndexRoutes
        ]
    }
];
