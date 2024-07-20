import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

// Services
import { PublicService } from '../services/public.service';
import { I18nService } from '../../shared/services/i18n.service';
import { ThemeService } from '../../shared/services/theme.service';

@Injectable({
  providedIn: 'root'
})
export class SystemSetupResolverSVC {

  systemSetup: any = null;

  constructor(
    private publicService: PublicService,
    private i18n: I18nService,
    private themeService: ThemeService
  ) {}

  getSystemSetup(): Observable<any> {
    return this.publicService.getSystemSetup().pipe(
      map((res) => {
        this.systemSetup = res.data;
        this.i18n.refreshUserSetup(this.systemSetup);
        this.themeService.loadSystemSetup(this.systemSetup);
        return this.systemSetup;
      }),
      catchError((err) => {
        console.error(`Failed to fetch user setup : ${err}`);
        return of(null);
      })
    );
  }
}

export const SystemSetupResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(SystemSetupResolverSVC).getSystemSetup();
}
