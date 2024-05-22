import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PublicService } from '../services/public.service';
import { I18nService } from '../../shared/services/i18n.service';
import { ThemeService } from '../../shared/services/theme.service';

@Injectable({
  providedIn: 'root'
})
export class SystemSetupResolver implements Resolve<boolean> {

  systemSetup: any = null;

  constructor(
    private publicService: PublicService,
    private i18n: I18nService,
    private themeService: ThemeService
  ) {}

  getSystemSetup(): any {
    this.publicService.getSystemSetup().subscribe({
      next: (res) => {
        this.systemSetup = res.data;
        this.i18n.loadSystemHeader(this.systemSetup);
        this.i18n.refreshUserSetup(this.systemSetup);
        this.themeService.loadSystemSetup(this.systemSetup);
        return true;
      },
      error: (err) => {
        console.error(`Failed to fetch user setup : ${err}`);
        return false;
      }
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.getSystemSetup();
  }
}
