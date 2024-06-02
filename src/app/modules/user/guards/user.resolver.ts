import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { I18nService } from '../../shared/services/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService,
    private i18n: I18nService
  ) {}

  getUserInfo(): any {
    const userId = this.authService.getUserId();
    this.userService.getUserInfo(userId).subscribe({
      next: (res) => {
        const userData = res.data;
        this.authService.setUserRole(userData.userRole);
        this.authService.setUserScope(userData.userScopes);
        this.authService.setUserSetup(userData.userSetup);
        this.authService.setUserData(userData.userRecord);
        this.i18n.refreshUserSetup(userData.userSetup);
        return userData.userRecord;
      },
      error: (err: any) => {
        this.notificationService.error(err);
      }
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.getUserInfo();
  }
}
