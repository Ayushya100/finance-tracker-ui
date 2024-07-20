import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { I18nService } from '../../shared/services/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverSVC {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService,
    private i18n: I18nService
  ) {}

  getUserInfo(): Observable<any> {
    const userId = this.authService.getUserId();
    return this.userService.getUserInfo(userId).pipe(
      map((res) => {
        const userData = res.data;
        this.authService.setUserRole(userData.userRole);
        this.authService.setUserScope(userData.userScopes);
        this.authService.setUserSetup(userData.userSetup);
        this.authService.setUserData(userData.userRecord);
        this.i18n.refreshUserSetup(userData.userSetup);
        return userData.userRecord;
      }),
      catchError((err) => {
        this.notificationService.error(err);
        return of(null);
      })
    );
  }
}

export const UserResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(UserResolverSVC).getUserInfo();
}