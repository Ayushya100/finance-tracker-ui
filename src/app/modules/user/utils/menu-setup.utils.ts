import { Injectable } from '@angular/core';
import { I18nService } from '../../shared/services/i18n.service';

@Injectable({
    providedIn: 'root'
})

export class MenuSetupUtils {

    menuPrefix = 'userSection.userMenu.utils.';
    
    constructor(private i18n: I18nService) {}

    getUserMenuHeaderData() {
        return [
            {
                type: 'link',
                title: this.i18n.translate(`${this.menuPrefix}Your Profile`),
                link: '/user-profile',
                icon: 'person'
            },
            {
                type: 'link',
                title: this.i18n.translate(`${this.menuPrefix}Your Setup`),
                link: '/user-setup',
                icon: 'settings'
            },
            {
                type: 'link',
                title: this.i18n.translate(`${this.menuPrefix}Logout`),
                link: '/logout',
                icon: 'logout'
            }
        ];
    }

    getUserMenuSetupData() {
        return [
            {
                type: 'link',
                title: this.i18n.translate(`${this.menuPrefix}Home`),
                open: false,
                link: '/',
                icon: 'home',
                children: null
            },
            {
                type: 'link',
                title: this.i18n.translate(`${this.menuPrefix}Dashboard`),
                open: false,
                link: '/dashboard',
                icon: 'analytics',
                children: null
            },
            {
                type: 'link',
                title: this.i18n.translate(`${this.menuPrefix}Reports`),
                open: false,
                link: '/report',
                icon: 'assignment',
                children: null
            },
            {
                type: 'link',
                title: this.i18n.translate(`${this.menuPrefix}Payment Options`),
                open: false,
                link: '/card-account',
                icon: 'account_balance_wallet',
                children: null
            },
            {
                type: 'link',
                title: this.i18n.translate(`${this.menuPrefix}Category and Tags`),
                open: false,
                link: '/card-account',
                icon: 'loyalty',
                children: null
            },
            {
                type: 'parent',
                title: this.i18n.translate(`${this.menuPrefix}Expenditure`),
                open: false,
                link: null,
                icon: 'payments',
                children: [
                    {
                        type: 'link',
                        title: this.i18n.translate(`${this.menuPrefix}Register Expense`),
                        open: false,
                        link: '/expenditure/register-expense',
                        icon: 'payments'
                    },
                    {
                        type: 'link',
                        title: this.i18n.translate(`${this.menuPrefix}Register Credit Expense`),
                        open: false,
                        link: '/expenditure/register-credit-expense',
                        icon: 'credit_card'
                    }
                ]
            },
            {
                type: 'parent',
                title: this.i18n.translate(`${this.menuPrefix}Funds`),
                open: false,
                link: null,
                icon: 'savings',
                children: [
                    {
                        type: 'link',
                        title: this.i18n.translate(`${this.menuPrefix}Add Funds`),
                        open: false,
                        link: '/funds/add-funds',
                        icon: 'attach_money'
                    }
                ]
            },
            {
                type: 'parent',
                title: this.i18n.translate(`${this.menuPrefix}Investment`),
                open: false,
                link: null,
                icon: 'trending_up',
                children: [
                    {
                        type: 'link',
                        title: this.i18n.translate(`${this.menuPrefix}Register Investment`),
                        open: false,
                        link: '/investment/register-investment',
                        icon: 'timeline'
                    }
                ]
            }
        ];
    }
};
