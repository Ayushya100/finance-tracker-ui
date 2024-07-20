import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, switchMap, throwError } from 'rxjs';

// Services
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { LoaderService } from '../../shared/services/loader.service';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const token = this.authService.getUserToken();

    let modifiedReq = req;
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(modifiedReq).pipe(
      catchError(err => {
          this.notificationService.error(err);
          if (err.error.statusCode === 401 && err.error.errors === 'UNAUTHORIZED ACCESS - TOKEN EXPIRED') {
              return this.refreshTokenAndRetry(req, next);
          }
          return throwError(() => err);
      }),
      finalize(() => {
          this.loaderService.hide();
      })
    );
  }

  refreshTokenAndRetry(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.userService.refreshToken().pipe(
      switchMap((res: any) => {
        this.notificationService.success(res);

        const token = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        this.authService.setUserToken(token);
        this.authService.setRefreshToken(refreshToken);

        const newReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(newReq);
      }),
      catchError(err => {
        this.notificationService.error(err);
        return throwError(() => err);
      })
    );
  }
}
