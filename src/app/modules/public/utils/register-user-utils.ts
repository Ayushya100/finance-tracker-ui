import { Injectable } from '@angular/core';
import { I18nService } from '../../shared/services/i18n.service';

@Injectable({
    providedIn: 'root'
})

export class UserFormsUtils {
    
    registerFormPrefix: any = 'registerUserComponent.utils.fields.';
    registerValidatorPrefix: any = 'registerUserComponent.utils.validation.';

    constructor(private i18n: I18nService) {}

    async getUserRegistrationFormsMetadata() {
        return {
            fields: [
                {
                    label: await this.i18n.translate(`${this.registerFormPrefix}First Name`),
                    field: 'firstName',
                    type: 'text',
                    required: true,
                    placeholder: await this.i18n.translate(`${this.registerFormPrefix}Provide your First Name`)
                },
                {
                    label: await this.i18n.translate(`${this.registerFormPrefix}Last Name`),
                    field: 'lastName',
                    type: 'text',
                    required: false,
                    placeholder: await this.i18n.translate(`${this.registerFormPrefix}Provide your Last Name`)
                },
                {
                    label: await this.i18n.translate(`${this.registerFormPrefix}Email Id`),
                    field: 'emailId',
                    type: 'email',
                    required: true,
                    placeholder: await this.i18n.translate(`${this.registerFormPrefix}Register your Email Id`)
                },
                {
                    label: await this.i18n.translate(`${this.registerFormPrefix}User Name`),
                    field: 'userName',
                    type: 'text',
                    required: true,
                    placeholder: await this.i18n.translate(`${this.registerFormPrefix}Select your Username`)
                },
                {
                    label: await this.i18n.translate(`${this.registerFormPrefix}Password`),
                    field: 'password',
                    type: 'password',
                    required: true,
                    placeholder: await this.i18n.translate(`${this.registerFormPrefix}Enter your Password`)
                }
            ],
            validators: [
                {
                    text: await this.i18n.translate(`${this.registerValidatorPrefix}First Name is required`),
                    field: 'firstName'
                },
                {
                    text: await this.i18n.translate(`${this.registerValidatorPrefix}Email Id is required`),
                    field: 'emailId'
                },
                {
                    text: await this.i18n.translate(`${this.registerValidatorPrefix}Username is required`),
                    field: 'userName'
                },
                {
                    text: await this.i18n.translate(`${this.registerValidatorPrefix}Password is required`),
                    field: 'password'
                }
            ]
        }
    }
}