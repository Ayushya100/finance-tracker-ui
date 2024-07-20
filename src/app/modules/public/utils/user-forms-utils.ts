import { Injectable } from "@angular/core";
import { I18nService } from "../../shared/services/i18n.service";

@Injectable({
    providedIn: 'root'
})

export class UserFormsUtils {
    
    registerFormPrefix: any = 'registerUserComponent.utils.fields.';
    registerValidatorPrefix: any = 'registerUserComponent.utils.validation.';
    loginfFormPrefix: any = 'loginUserComponent.utils.fields.';
    loginValidatorPrefix: any = 'loginUserComponent.utils.validation.';

    constructor(private i18n: I18nService) {}

    getUserRegistrationFormsMetadata() {
        return {
            fields: [
                {
                    label: this.i18n.translate(`${this.registerFormPrefix}First Name`),
                    field: 'firstName',
                    type: 'text',
                    required: true,
                    placeholder: this.i18n.translate(`${this.registerFormPrefix}Provide your First Name`)
                },
                {
                    label: this.i18n.translate(`${this.registerFormPrefix}Last Name`),
                    field: 'lastName',
                    type: 'text',
                    required: false,
                    placeholder: this.i18n.translate(`${this.registerFormPrefix}Provide your Last Name`)
                },
                {
                    label: this.i18n.translate(`${this.registerFormPrefix}Email Id`),
                    field: 'emailId',
                    type: 'email',
                    required: true,
                    placeholder: this.i18n.translate(`${this.registerFormPrefix}Register your Email Id`)
                },
                {
                    label: this.i18n.translate(`${this.registerFormPrefix}User Name`),
                    field: 'userName',
                    type: 'text',
                    required: true,
                    placeholder: this.i18n.translate(`${this.registerFormPrefix}Select your Username`)
                },
                {
                    label: this.i18n.translate(`${this.registerFormPrefix}Password`),
                    field: 'password',
                    type: 'password',
                    required: true,
                    placeholder: this.i18n.translate(`${this.registerFormPrefix}Enter your Password`)
                }
            ],
            validators: [
                {
                    text: this.i18n.translate(`${this.registerValidatorPrefix}First Name is required`),
                    field: 'firstName'
                },
                {
                    text: this.i18n.translate(`${this.registerValidatorPrefix}Email Id is required`),
                    field: 'emailId'
                },
                {
                    text: this.i18n.translate(`${this.registerValidatorPrefix}Username is required`),
                    field: 'userName'
                },
                {
                    text: this.i18n.translate(`${this.registerValidatorPrefix}Password is required`),
                    field: 'password'
                }
            ]
        };
    }

    getUserLoginFormsMetadata() {
        return {
            fields: [
                {
                    label: this.i18n.translate(`${this.loginfFormPrefix}Username / Email Id`),
                    field: 'userName',
                    type: 'text',
                    required: true,
                    placeholder: this.i18n.translate(`${this.loginfFormPrefix}Provide your username or emailId`)
                },
                {
                    label: this.i18n.translate(`${this.loginfFormPrefix}Password`),
                    field: 'password',
                    type: 'password',
                    required: true,
                    placeholder: this.i18n.translate(`${this.loginfFormPrefix}Enter your Password`)
                }
            ],
            validators: [
                {
                    text: this.i18n.translate(`${this.loginValidatorPrefix}Username / Email Id is required`),
                    field: 'userName'
                },
                {
                    text: this.i18n.translate(`${this.loginValidatorPrefix}Password is required`),
                    field: 'password'
                }
            ]
        };
    }
}