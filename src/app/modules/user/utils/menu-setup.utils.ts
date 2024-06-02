import { Injectable } from "@angular/core";
import { I18nService } from "../../shared/services/i18n.service";

@Injectable({
    providedIn: 'root'
})

export class MenuSetupUtils {

    menuPrefix = 'userSection.userMenu.utils.';
    
    constructor(private i18n: I18nService) {}

    async getUserMenuHeaderData() {
        return [
            {
                type: 'link',
                title: await this.i18n.translate(`${this.menuPrefix}User Profile`),
                link: '/user-profile',
                icon: 'create'
            },
            {
                type: 'link',
                title: await this.i18n.translate(`${this.menuPrefix}User Setup`),
                link: '/user-setup',
                icon: 'settings'
            },
            {
                type: 'link',
                title: await this.i18n.translate(`${this.menuPrefix}Logout`),
                link: '/logout',
                icon: 'logout'
            }
        ];
    }

    async getUserMenuSetupData() {
        return [
            {
                type: 'link',
                title: await this.i18n.translate(`${this.menuPrefix}Home`),
                open: false,
                link: '/',
                icon: 'home',
                children: null
            },
            {
                type: 'parent',
                title: await this.i18n.translate(`${this.menuPrefix}Expenditure`),
                open: false,
                link: null,
                icon: 'payments',
                children: [
                    {
                        type: 'link',
                        title: await this.i18n.translate(`${this.menuPrefix}Add Tags`),
                        open: false,
                        link: '/expenditure/add-tags',
                        icon: 'add'
                    },
                    {
                        type: 'link',
                        title: await this.i18n.translate(`${this.menuPrefix}Register Expense`),
                        open: false,
                        link: '/expenditure/register-expense',
                        icon: 'payments'
                    },
                    {
                        type: 'link',
                        title: await this.i18n.translate(`${this.menuPrefix}Register Credit Expense`),
                        open: false,
                        link: '/expenditure/register-credit-expense',
                        icon: 'credit_card'
                    }
                ]
            },
            {
                type: 'parent',
                title: await this.i18n.translate(`${this.menuPrefix}Funds`),
                open: false,
                link: null,
                icon: 'savings',
                children: [
                    {
                        type: 'link',
                        title: await this.i18n.translate(`${this.menuPrefix}Add Tags`),
                        open: false,
                        link: '/funds/add-tags',
                        icon: 'add'
                    },
                    {
                        type: 'link',
                        title: await this.i18n.translate(`${this.menuPrefix}Add Funds`),
                        open: false,
                        link: '/funds/add-funds',
                        icon: 'attach_money'
                    }
                ]
            },
            {
                type: 'parent',
                title: await this.i18n.translate(`${this.menuPrefix}Investment`),
                open: false,
                link: null,
                icon: 'trending_up',
                children: [
                    {
                        type: 'link',
                        title: await this.i18n.translate(`${this.menuPrefix}Add Tags`),
                        open: false,
                        link: '/investment/add-tags',
                        icon: 'add'
                    },
                    {
                        type: 'link',
                        title: await this.i18n.translate(`${this.menuPrefix}Register Investment`),
                        open: false,
                        link: '/investment/register-investment',
                        icon: 'timeline'
                    }
                ]
            },
            {
                type: 'link',
                title: await this.i18n.translate(`${this.menuPrefix}Dashboard`),
                open: false,
                link: '/dashboard',
                icon: 'analytics',
                children: null
            },
            {
                type: 'link',
                title: await this.i18n.translate(`${this.menuPrefix}Reports`),
                open: false,
                link: '/report',
                icon: 'assignment',
                children: null
            }
        ];
    }
};
