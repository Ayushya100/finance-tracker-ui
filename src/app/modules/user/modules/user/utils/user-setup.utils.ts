import { Injectable } from "@angular/core";
import { I18nService } from "src/app/modules/shared/services/i18n.service";

@Injectable({
    providedIn: 'root'
})

export class UserSetupUtils {

    utilsPrefix: string = 'userSection.userSetup.utils.';

    constructor(private i18n: I18nService) {}

    getUserSetupActions() {
        return {
            actions: [
                {
                    label: this.i18n.translate(`${this.utilsPrefix}Update`),
                    type: 'submit'
                },
                {
                    label: this.i18n.translate(`${this.utilsPrefix}Cancel`),
                    type: 'cancel'
                }
            ]
        };
    }

    getUserDashboardMetadata() {
        return {
            fields: [
                {
                    label: this.i18n.translate(`${this.utilsPrefix}Configure your charts for Expenses`),
                    type: 'Expense',
                    categories: [
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Daily`),
                            value: 'daily',
                            setup: []
                        },
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Monthly`),
                            value: 'monthly',
                            setup: []
                        },
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Yearly`),
                            value: 'yearly',
                            setup: []
                        },
                        // {
                        //     header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                        //     duration: this.i18n.translate(`${this.utilsPrefix}Custom`),
                        //     value: 'custom',
                        //     setup: []
                        // }
                    ]
                },
                {
                    label: this.i18n.translate(`${this.utilsPrefix}Configure your charts for Investments`),
                    type: 'Investment',
                    categories: [
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Daily`),
                            value: 'daily',
                            setup: []
                        },
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Monthly`),
                            value: 'monthly',
                            setup: []
                        },
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Yearly`),
                            value: 'yearly',
                            setup: []
                        },
                        // {
                        //     header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                        //     duration: this.i18n.translate(`${this.utilsPrefix}Custom`),
                        //     value: 'custom',
                        //     setup: []
                        // }
                    ]
                },
                {
                    label: this.i18n.translate(`${this.utilsPrefix}Configure your charts for Incomes`),
                    type: 'Income',
                    categories: [
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Daily`),
                            value: 'daily',
                            setup: []
                        },
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Monthly`),
                            value: 'monthly',
                            setup: []
                        },
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Yearly`),
                            value: 'yearly',
                            setup: []
                        },
                        // {
                        //     header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                        //     duration: this.i18n.translate(`${this.utilsPrefix}Custom`),
                        //     value: 'custom',
                        //     setup: []
                        // }
                    ]
                }
            ]
        };
    }

    getUserReportMetadata() {
        return {
            fields: [
                {
                    label: this.i18n.translate(`${this.utilsPrefix}Configure your Expense Reports`),
                    type: 'Expense',
                    categories: [
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Daily Monthly Yearly Custom`),
                            value: 'custom',
                            setup: []
                        }
                    ]
                },
                {
                    label: this.i18n.translate(`${this.utilsPrefix}Configure your Investment Reports`),
                    type: 'Investment',
                    categories: [
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Daily Monthly Yearly Custom`),
                            value: 'custom',
                            setup: []
                        }
                    ]
                },
                {
                    label: this.i18n.translate(`${this.utilsPrefix}Configure your Income Reports`),
                    type: 'Income',
                    categories: [
                        {
                            header: this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: this.i18n.translate(`${this.utilsPrefix}Daily Monthly Yearly Custom`),
                            value: 'custom',
                            setup: []
                        }
                    ]
                }
            ]
        };
    }
}
