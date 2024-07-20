import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

// Services
import { AuthService } from '../services/auth.service';
import { I18nService } from '../../shared/services/i18n.service';
import { PaymentOptionsService } from '../modules/payment options/services/payment-options.service';
import { NotificationService } from '../../shared/services/notification.service';
import { PaymentState } from '../models/user-payment';

@Injectable({
    providedIn: 'root'
})
export class PaymentStore {

    messagePrefix: string = 'paymentSection.paymentDetails.message.'

    state: PaymentState = new PaymentState();

    private stateSubject = new BehaviorSubject(this.state);
    private subscriptions: Subscription = new Subscription();

    userId: string | null = null;

    constructor(
        private authService: AuthService,
        private i18n: I18nService,
        private notificationService: NotificationService,
        private paymentService: PaymentOptionsService
    ) {
        this.userId = this.authService.getUserId();
    }

    getStateSubject() {
        return this.stateSubject;
    }

    serializeSubject() {
        this.stateSubject.next(Object.assign({}, this.state));
    }

    // loadPaymentInfo() {
    //     this.loadAllAccountInfo();
    //     this.loadAllCardInfo();
    //     this.loadAllPaymentInfo();
    // }

    // loadAllAccountInfo() {
    //     const filterOptions = JSON.stringify({"fields":"token, accountName, accountType, accountNumber, holderName, amount, isActive"});
    //     this.paymentService.getAccountInfo(this.userId, null, filterOptions).subscribe({
    //         next: (res) => {
    //             this.state.userPaymentAccounts = res.data;
    //             this.notificationService.success(res);
    //             this.serializeSubject();
    //         },
    //         error: (err) => {
    //             console.error(`Error while loading User Account info : ${err}`);
    //             this.notificationService.error(err);
    //         }
    //     });
    //     this.serializeSubject();
    // }

    // loadAllCardInfo() {
    //     const filterOptions = JSON.stringify({"fields":"token, accountId, holderName, cardType, cardNumber, balance, isActive"});
    //     this.paymentService.getUserCards(this.userId, null, filterOptions).subscribe({
    //         next: (res) => {
    //             this.state.userPaymentCards = res.data;
    //             this.notificationService.success(res);
    //             this.serializeSubject();
    //         },
    //         error: (err) => {
    //             console.error(`Error while loading User Card info : ${err}`);
    //             this.notificationService.error(err);
    //         }
    //     });
    //     this.serializeSubject();
    // }

    // loadAllPaymentInfo() {
    //     const filterOptions = JSON.stringify({"fields":"token, accountId, paymentName, paymentType, paymentNumber, balance, isActive"});
    //     this.paymentService.getPaymentOptions(this.userId, null, filterOptions).subscribe({
    //         next: (res) => {
    //             this.state.userPaymentOptions = res.data;
    //             this.notificationService.success(res);
    //             this.serializeSubject();
    //         },
    //         error: (err) => {
    //             console.error(`Error while loading User Cash info : ${err}`);
    //             this.notificationService.error(err);
    //         }
    //     });
    //     this.serializeSubject();
    // }
    
}