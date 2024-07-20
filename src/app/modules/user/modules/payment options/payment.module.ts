import { CoreModule } from 'src/app/modules/core/core.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Components
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CardsComponent } from './components/cards/cards.component';
import { WalletsComponent } from './components/wallets/wallets.component';
import { AccountsPopupComponent } from './components/accounts-popup/accounts-popup.component';

// Module
import { SharedModule } from 'src/app/modules/shared/shared.module';

// Services
import { PaymentOptionsService } from './services/payment-options.service';
import { PaymentPopupService } from './services/payment-popup.service';

@NgModule({
  declarations: [
    PaymentDetailsComponent,
    AccountsComponent,
    CardsComponent,
    WalletsComponent,
    AccountsPopupComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    PaymentOptionsService,
    PaymentPopupService
  ]
})
export class PaymentModule { }
