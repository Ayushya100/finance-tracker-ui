import { Injectable } from "@angular/core";
import { I18nService } from "src/app/modules/shared/services/i18n.service";

@Injectable({
    providedIn: 'root'
})

export class UserSetupUtils {

    utilsPrefix: string = 'userSection.userSetup.utils.';

    constructor(private i18n: I18nService) {}

    async getUserSetupActions() {
        return {
            actions: [
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Update`),
                    type: 'submit'
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Cancel`),
                    type: 'cancel'
                }
            ]
        };
    }

    async getUserDashboardMetadata() {
        return {
            fields: [
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Configure your charts for Expenses`),
                    type: 'Expense',
                    categories: [
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Daily`),
                            value: 'daily',
                            setup: []
                        },
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Monthly`),
                            value: 'monthly',
                            setup: []
                        },
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Yearly`),
                            value: 'yearly',
                            setup: []
                        },
                        // {
                        //     header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                        //     duration: await this.i18n.translate(`${this.utilsPrefix}Custom`),
                        //     value: 'custom',
                        //     setup: []
                        // }
                    ]
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Configure your charts for Investments`),
                    type: 'Investment',
                    categories: [
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Daily`),
                            value: 'daily',
                            setup: []
                        },
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Monthly`),
                            value: 'monthly',
                            setup: []
                        },
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Yearly`),
                            value: 'yearly',
                            setup: []
                        },
                        // {
                        //     header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                        //     duration: await this.i18n.translate(`${this.utilsPrefix}Custom`),
                        //     value: 'custom',
                        //     setup: []
                        // }
                    ]
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Configure your charts for Incomes`),
                    type: 'Income',
                    categories: [
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Daily`),
                            value: 'daily',
                            setup: []
                        },
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Monthly`),
                            value: 'monthly',
                            setup: []
                        },
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Yearly`),
                            value: 'yearly',
                            setup: []
                        },
                        // {
                        //     header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                        //     duration: await this.i18n.translate(`${this.utilsPrefix}Custom`),
                        //     value: 'custom',
                        //     setup: []
                        // }
                    ]
                }
            ]
        };
    }

    async getUserReportMetadata() {
        return {
            fields: [
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Configure your Expense Reports`),
                    type: 'Expense',
                    categories: [
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Daily Monthly Yearly Custom`),
                            value: 'custom',
                            setup: []
                        }
                    ]
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Configure your Investment Reports`),
                    type: 'Investment',
                    categories: [
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Daily Monthly Yearly Custom`),
                            value: 'custom',
                            setup: []
                        }
                    ]
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Configure your Income Reports`),
                    type: 'Income',
                    categories: [
                        {
                            header: await this.i18n.translate(`${this.utilsPrefix}Duration`),
                            duration: await this.i18n.translate(`${this.utilsPrefix}Daily Monthly Yearly Custom`),
                            value: 'custom',
                            setup: []
                        }
                    ]
                }
            ]
        };
    }
}
