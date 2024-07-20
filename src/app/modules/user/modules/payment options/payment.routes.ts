import { Routes } from '@angular/router';

// Components
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';

import { UserResolver } from '../../guards/user.resolver';
import { AuthGuard } from '../../guards/auth-guard.guard';

export const paymentRoutes: Routes = [
    {
        path: 'payment-options', component: PaymentDetailsComponent, resolve: { userInfo: UserResolver },
        canActivate: [AuthGuard], data: { userScope: 'PAYMENT.V' }, runGuardsAndResolvers: 'always'
    }
]
