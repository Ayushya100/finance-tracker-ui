class AccountInfo {
    _id?: string = '';
    token: string = '';
    accountDate?: string = '';
    accountName?: string = '';
    accountNumber?: string = '';
    accountType?: string = '';
    amount?: number = 0;
    holderName?: string = '';
    isActive?: boolean = false;
}

class CardInfo {
    _id?: string = '';
    userId?: string = '';
    accountId?: string = '';
    token: string = '';
    cardNumber?: string = '';
    cardType?: string = '';
    expirationDate?: string = '';
    holderName?: string = '';
    balance?: number = 0;
    isActive?: boolean = false;
}

class PaymentInfo {
    _id?: string = '';
    userId?: string = '';
    accountId?: string = '';
    token: string = '';
    paymentName?: string = '';
    paymentNumber?: string = '';
    paymentType?: string = '';
    balance?: number = 0;
    isActive?: boolean = false;
}

export class PaymentState {
    userPaymentAccounts: Array<AccountInfo> = new Array<AccountInfo>;
    userPaymentCards: Array<CardInfo> = new Array<CardInfo>;
    userPaymentOptions: Array<PaymentInfo> = new Array<PaymentInfo>;
}