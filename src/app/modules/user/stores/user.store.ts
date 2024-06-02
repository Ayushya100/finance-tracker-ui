import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { I18nService } from '../../shared/services/i18n.service';
import { PopupService } from '../../shared/services/popup.service';

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
        private userService: UserService,
        private notificationService: NotificationService,
        private i18n: I18nService,
        private popupService: PopupService,
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
                this.state.userSetup = userData.userSetup;
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
    }

    async updateUserInfo(payload: any) {
        if (this.userId) {
            this.userService.updateUserInfo(this.userId, payload).subscribe({
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
            const msg = await this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
        this.serializeSubject();
    }

    async updateUserPassword(payload: any) {
        if (this.userId) {
            this.userService.updateUserPassword(this.userId, payload).subscribe({
                next: (res: any) => {
                    this.notificationService.success(res);
                },
                error: (err: any) => {
                    console.error(`Error while updating user info : ${err}`);
                    this.notificationService.error(err);
                }
            });
        } else {
            const msg = await this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
    }

    async updateUserImage(formData: any) {
        if (this.userId) {
            this.userService.updateUserImage(this.userId, formData).subscribe({
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
            const msg = await this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
        this.serializeSubject();
    }

    async deleteUserImage() {
        if (this.userId) {
            this.userService.deleteUserImage(this.userId).subscribe({
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
            const msg = await this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
        this.serializeSubject();
    }

    async deactivateUserAccount(payload: any) {
        if (this.userId) {
            const msgHeader = await this.i18n.translate(`${this.messagePrefix}Account Deletion in Progress`);
            const msg = await this.i18n.translate(`${this.messagePrefix}Your account deletion request has been considered`);
            const msgFooter = await this.i18n.translate(`${this.messagePrefix}Thank you for using our service`);

            this.userService.deactivateUserAccount(this.userId, payload).subscribe({
                next: (res: any) => {
                    this.notificationService.success(res);
                    this.popupService.openMsgPopup({
                        msgHeader: msgHeader,
                        msgBody: msg,
                        msgFooter: msgFooter
                    }).then(() => {
                        this.userService.logoutUser().subscribe({
                            next: (res: any) => {
                                this.notificationService.success(res);
                                this.authService.clearAuthData();
                                this.router.navigate(['']);
                            },
                            error: (err: any) => {
                                console.error(`Error while logging out user: ${err}`);
                                this.notificationService.error(err);
                            }
                        })
                    });
                },
                error: (err: any) => {
                    console.error(`Error while deleting user image : ${err}`);
                    this.notificationService.error(err);
                }
            });
        } else {
            const msg = await this.i18n.translate(`${this.messagePrefix}User id not found`);
            this.notificationService.errorMessage(`${msg}`);
        }
    }
}
