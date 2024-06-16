import { Injectable } from '@angular/core';
import { I18nService } from 'src/app/modules/shared/services/i18n.service';

@Injectable({
    providedIn: 'root'
})

export class UserDetailsFormUtils {
    
    utilsPrefix: string = 'userSection.userProfile.utils.';
    userPrefix: string = 'userSection.userProfile.component.';

    constructor(private i18n: I18nService) {}

    async getUserImageMetadata() {
        return {
            actions: [
                {
                    label: await this.i18n.translate(`${this.userPrefix}Upload`),
                    type: 'submit'
                },
                {
                    label: await this.i18n.translate(`${this.userPrefix}Delete`),
                    type: 'delete'
                }
            ]
        };
    }

    async getUserBioFormMetadata() {
        return {
            fields: [
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Bio`),
                    field: 'bio',
                    type: 'textarea',
                    required: false,
                    readonly: true,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Write some details about you`)
                }
            ],
            actions: [
                {
                    label: await this.i18n.translate(`${this.userPrefix}Update`),
                    type: 'submit'
                }
            ]
        };
    }

    async getUserDetailsMetadata() {
        return {
            fields: [
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}First Name`),
                    field: 'firstName',
                    type: 'text',
                    required: true,
                    readonly: true,
                    span: 1,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Enter First Name`)
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Last Name`),
                    field: 'lastName',
                    type: 'text',
                    required: true,
                    readonly: true,
                    span: 1,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Enter Last Name`)
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Username`),
                    field: 'userName',
                    type: 'text',
                    required: true,
                    readonly: true,
                    span: 2,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Enter your username`)
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Email Id`),
                    field: 'emailId',
                    type: 'email',
                    required: true,
                    readonly: true,
                    span: 2,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Enter your emailId`)
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Gender`),
                    field: 'gender',
                    type: 'dropdown',
                    options: [
                        { value: 'M', viewValue: 'Male' },
                        { value: 'F', viewValue: 'Female' },
                        { value: 'O', viewValue: 'Others' }
                    ],
                    required: false,
                    readonly: true,
                    span: 1,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Provide your gender`)
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}DOB`),
                    field: 'dob',
                    type: 'date',
                    required: false,
                    readonly: true,
                    span: 1,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Choose DOB`)
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Contact Number`),
                    field: 'contactNumber',
                    type: 'number',
                    required: false,
                    readonly: true,
                    span: 2,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Enter your contact number`)
                }
            ],
            actions: [
                {
                    label: await this.i18n.translate(`${this.userPrefix}Update`),
                    type: 'submit'
                },
                {
                    label: await this.i18n.translate(`${this.userPrefix}Cancel`),
                    type: 'cancel'
                }
            ]
        };
    }

    async getUserPasswordMetadata() {
        return {
            fields: [
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Old Password`),
                    field: 'oldPassword',
                    type: 'password',
                    required: true,
                    readonly: true,
                    span: 2,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Enter your current password`)
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}New Password`),
                    field: 'newPassword',
                    type: 'password',
                    required: true,
                    readonly: true,
                    span: 2,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Provide your new password`)
                }
            ],
            actions: [
                {
                    label: await this.i18n.translate(`${this.userPrefix}Update`),
                    type: 'submit'
                },
                {
                    label: await this.i18n.translate(`${this.userPrefix}Cancel`),
                    type: 'cancel'
                }
            ]
        };
    }

    async getUserDeactivationMetadata() {
        return {
            fields: [
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Username`),
                    field: 'userName',
                    type: 'text',
                    required: true,
                    readonly: false,
                    span: 2,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Enter your username`)
                },
                {
                    label: await this.i18n.translate(`${this.utilsPrefix}Password`),
                    field: 'password',
                    type: 'password',
                    required: true,
                    readonly: false,
                    span: 2,
                    placeholder: await this.i18n.translate(`${this.utilsPrefix}Enter your Password`)
                }
            ],
            actions: [
                {
                    label: await this.i18n.translate(`${this.userPrefix}Submit`),
                    type: 'submit'
                },
                {
                    label: await this.i18n.translate(`${this.userPrefix}Cancel`),
                    type: 'cancel'
                }
            ]
        };
    }
}
