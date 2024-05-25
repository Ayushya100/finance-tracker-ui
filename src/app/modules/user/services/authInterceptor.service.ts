import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getUserToken();
        const role = this.authService.getUserRole();
        const scope = this.authService.getUserScope();
        const setup = this.authService.getUserSetup();

        let modifiedReq = req;
        if (token) {
            modifiedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        if (role || scope || setup) {
            modifiedReq = modifiedReq.clone({
                body: {
                    ...req.body,
                    role: role,
                    scope: scope,
                    setup: setup
                }
            });
        }

        return next.handle(modifiedReq);
  }
}
