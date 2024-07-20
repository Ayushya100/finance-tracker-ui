import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../../shared/services/theme.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try {
      let requiredScope: any = route.data;
      requiredScope = requiredScope.userScope;
      const token = this.authService.getUserToken();

      if (token && this.userHasRequiredScope(requiredScope)) {
        const userSetup = this.authService.getUserSetup();
        this.themeService.loadSystemSetup(userSetup);
        return true;
      }
      this.router.navigate(['/login-user']);
      return false;
    } catch (err) {
      this.router.navigate(['/login-user']);
      return false;
    }
  }

  private userHasRequiredScope(scope: string) {
    const userScopes = this.authService.getUserScope();
    return userScopes.includes(scope);
  }
  
}
