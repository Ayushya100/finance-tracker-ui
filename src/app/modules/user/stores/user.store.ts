import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';
import { UserGeneralService } from '../modules/user/services/user.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { I18nService } from '../../shared/services/i18n.service';
import { PopupService } from '../../shared/services/popup.service';
import { ThemeService } from '../../shared/services/theme.service';

// State
import { UserState } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UserStore {

    messagePrefix: string = 'userSection.userProfile.message.';

    state: UserState = new UserState();

    private stateSubject = new BehaviorSubject(this.state);
    private subscriptions: Subscription = new Subscription();

    userId: string | null = null;

    constructor(
        private authService: AuthService,
        private userGeneralService: UserGeneralService,
        private userService: UserService,
        private notificationService: NotificationService,
        private i18n: I18nService,
        private popupService: PopupService,
        private themeService: ThemeService,
        private router: Router
    ) {
        this.userId = this.authService.getUserId();
    }

    getStateSubject() {
        return this.stateSubject;
    }

    serializeSubject() {
        this.stateSubject.next(Object.assign({}, this.state));
    }

    loadUserInfo(id: any) {
        this.userService.getUserInfo(id).subscribe({
            next: (res) => {
                const userData = res.data;
                this.assignUserGeneralInfo(userData.userRecord);
                this.state.userRole = userData.userRole;
                this.state.userScopes = userData.userScopes;
                this.loadUserPermissions(userData.userScopes);
                this.i18n.refreshUserSetup(userData.userSetup);
                this.serializeSubject();
            },
            error: (err) => {
                console.error(`Error while loading user info : ${err}`);
                this.notificationService.error(err);
            }
        });
        this.serializeSubject();
    }

    loadUserSetup(id: any) {
        this.userGeneralService.getUserSetup(id).subscribe({
            next: (res) => {
                const userSetup = res.data;
                this.state.userSetup = userSetup;
                this.serializeSubject();
            },
            error: (err) => {
                console.error(`Error while loading user setup : ${err}`);
                this.notificationService.error(err);
            }
        });
        this.serializeSubject();
    }

    assignUserGeneralInfo(userRecord: any) {
        this.state._id = userRecord._id;
        this.state.firstName = userRecord.firstName;
        this.state.lastName = userRecord.lastName;
        this.state.userName = userRecord.userName;
        this.state.emailId = userRecord.emailId;
        this.state.bio = userRecord.bio;
        this.state.gender = userRecord.gender;
        this.state.dob = userRecord.dob;
        this.state.contactNumber = userRecord.contactNumber;
        this.state.profileImageURL = userRecord.profileImageURL;
        this.state.lastLogin = userRecord.lastLogin;
        this.state.loginCount = userRecord.loginCount;
        this.state.isVerified = userRecord.isVerified;
        this.state.isDeleted = userRecord.isDeleted;

        const date = new Date(this.state.dob);
        const year = date.getUTCFullYear();
        const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        const day = ('0' + date.getUTCDate()).slice(-2);
        this.state.dob = `${year}-${month}-${day}`;
    }

    loadUserPermissions(userScopes: any) {
        this.state.userPermissions.viewPermission = userScopes.includes('USER.V');
        this.state.userPermissions.editPermission = userScopes.includes('USER.U');
        this.state.userPermissions.deletePermission = userScopes.includes('USER.D');

        this.state.userPermissions.routeViewPermission = userScopes.includes('ROUTE.V');
        this.state.userPermissions.routeEditPermission = userScopes.includes('ROUTE.U');
        this.state.userPermissions.routeDeletePermission = userScopes.includes('ROUTE.D');
        this.state.userPermissions.roleViewPermission = userScopes.includes('ROLE.V');
        this.state.userPermissions.roleEditPermission = userScopes.includes('ROLE.U');
        this.state.userPermissions.roleDeletePermission = userScopes.includes('ROLE.D');
        this.state.userPermissions.scopeViewPermission = userScopes.includes('SCOPE.V');
        this.state.userPermissions.scopeEditPermission = userScopes.includes('SCOPE.U');
        this.state.userPermissions.scopeDeletePermission = userScopes.includes('SCOPE.D');

        this.state.userPermissions.setupViewPermission = userScopes.includes('SETUP.V');
        this.state.userPermissions.setupEditPermission = userScopes.includes('SETUP.U');
        this.state.userPermissions.setupDeletePermission = userScopes.includes('SETUP.D');
        
        this.state.userPermissions.paymentViewPermission = userScopes.includes('PAYMENT.V');
        this.state.userPermissions.paymentEditPermission = userScopes.includes('PAYMENT.U');
        this.state.userPermissions.paymentDeletePermission = userScopes.includes('PAYMENT.D');
    }

    updateUserInfo(payload: any) {
        if (this.userId) {
            this.userGeneralService.updateUserInfo(this.userId, payload).subscribe({
                next: (res: any) => {
                    this.notificationService.success(res);
                    this.assignUserGeneralInfo(res.data);
                    this.serializeSubject();
                },
                error: (err: any) => {
                    console.error(`Error while updating user info : ${err}`);
                    this.notificationService.error(err);
                }
            });
        } else {
            const msg = this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
        this.serializeSubject();
    }

    updateUserPassword(payload: any) {
        if (this.userId) {
            this.userGeneralService.updateUserPassword(this.userId, payload).subscribe({
                next: (res: any) => {
                    this.notificationService.success(res);
                },
                error: (err: any) => {
                    console.error(`Error while updating user info : ${err}`);
                    this.notificationService.error(err);
                }
            });
        } else {
            const msg = this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
    }

    updateUserImage(formData: any) {
        if (this.userId) {
            this.userGeneralService.updateUserImage(this.userId, formData).subscribe({
                next: (res: any) => {
                    this.state.profileImageURL = res.data.profileImageURL;
                    this.serializeSubject();
                    this.notificationService.success(res);
                },
                error: (err: any) => {
                    console.error(`Error while updating user image : ${err}`);
                    this.notificationService.error(err);
                }
            })
        } else {
            const msg = this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
        this.serializeSubject();
    }

    deleteUserImage() {
        if (this.userId) {
            this.userGeneralService.deleteUserImage(this.userId).subscribe({
                next: (res: any) => {
                    this.state.profileImageURL = res.data.profileImageURL;
                    this.serializeSubject();
                    this.notificationService.success(res);
                },
                error: (err: any) => {
                    console.error(`Error while deleting user image : ${err}`);
                    this.notificationService.error(err);
                }
            })
        } else {
            const msg = this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
        this.serializeSubject();
    }

    deactivateUserAccount(payload: any) {
        if (this.userId) {
            const msgHeader = this.i18n.translate(`${this.messagePrefix}Account Deletion in Progress`);
            const msg = this.i18n.translate(`${this.messagePrefix}Your account deletion request has been considered`);
            const msgFooter = this.i18n.translate(`${this.messagePrefix}Thank you for using our service`);

            this.userGeneralService.deactivateUserAccount(this.userId, payload).subscribe({
                next: (res: any) => {
                    this.notificationService.success(res);
                    // this.popupService.openMsgPopup({
                    //     msgHeader: msgHeader,
                    //     msgBody: msg,
                    //     msgFooter: msgFooter
                    // }).then(() => {
                    //     this.userService.logoutUser().subscribe({
                    //         next: (res: any) => {
                    //             this.notificationService.success(res);
                    //             this.authService.clearAuthData();
                    //             this.router.navigate(['']);
                    //         },
                    //         error: (err: any) => {
                    //             console.error(`Error while logging out user: ${err}`);
                    //             this.notificationService.error(err);
                    //         }
                    //     })
                    // });
                },
                error: (err: any) => {
                    console.error(`Error while deleting user image : ${err}`);
                    this.notificationService.error(err);
                }
            });
        } else {
            const msg = this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
    }

    updateUserSetup(payload: any, themeChange: boolean) {
        if (this.userId) {
            const setupPayload = {
                records: payload.map((setup: any) => ({
                  _id: setup._id,
                  value: setup.value
                }))
            };

            this.userGeneralService.updateUserSetup(this.userId, setupPayload).subscribe({
                next: (res: any) => {
                    this.notificationService.success(res);
                    this.state.userSetup.map((setup: any) => {
                        let setupDetail = payload.filter((val: any) => val._id === setup._id);
                        setup.value = setupDetail && setupDetail[0] ? setupDetail[0].value : setup.value;
                    });

                    if (themeChange) {
                        this.themeService.loadSystemSetup(payload);
                        this.i18n.refreshUserSetup(payload);
                    }
                },
                error: (err: any) => {
                    console.error(`Error while updating user setup : ${err}`);
                    this.notificationService.error(err);
                }
            });
        } else {
            const msg = this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
    }
}
