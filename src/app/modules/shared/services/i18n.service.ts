import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { BASE_PATH } from 'src/app/app.tokens';
import * as _ from 'lodash';

// Translations
import * as engTranslation from '../../../../assets/i18n/eng.json';
import * as hinTranslation from '../../../../assets/i18n/hin.json';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private appTitle$ = new BehaviorSubject<string>('');
  private appQuote$ = new BehaviorSubject<string>('');

  private userSetupSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public setupData = this.userSetupSubject.asObservable();

  private translationCache: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private translationData = this.translationCache.asObservable();

  private translationURI = 'assets/i18n';

  constructor(
    private httpClient: HttpClient, @Optional() @Inject(BASE_PATH) private basePath: string,
    private translateService: TranslateService
  ) {
    this.translateService.addLangs(['eng', 'hin']);
    this.translateService.setDefaultLang('eng');
  }

  refreshUserSetup(setup: any) {
    this.fetchSystemSetup(setup);
  }

  getUserSetup(): Observable<any> {
    return this.setupData;
  }

  fetchSystemSetup(systemSetup: any) {
    this.getUserSetup().subscribe({
      next: (currentSetup: any) => {
        if (currentSetup) {
          const userLang = systemSetup?.filter((val: any) => val.categoryName === 'user-language').map((val: any) => val.value)[0];
          if (this.translateService.currentLang !== userLang) {
            this.updateSystemLanguage(userLang);
          }
        }
      }
    });
    this.userSetupSubject.next(systemSetup);
    this.loadSystemHeader(systemSetup);
  }

  loadSystemHeader(systemSetup: any) {
    const title = systemSetup?.filter((val: any) => val.categoryName === 'application-title').map((val: any) => val.value)[0];
    const appQuote = systemSetup?.filter((val: any) => val.categoryName === 'application-quote').map((val: any) => val.value)[0];

    const currentTitle = this.appTitle$.getValue();
    const currentQuote = this.appQuote$.getValue();
    if (currentTitle !== title || currentQuote !== appQuote) {
      this.appTitle$.next(title);
      this.appQuote$.next(appQuote);
    }
  }

  updateSystemLanguage(lang: string) {
    if (lang === 'eng') {
      this.translateService.use('eng');
      this.translateService.setTranslation('eng', engTranslation, true);
    } else if (lang === 'hin') {
      this.translateService.use(lang);
      this.translateService.setTranslation('hin', hinTranslation, true);
    }
  }

  translate(key: string): string {
    const defaultValue = key.split('.').pop();
    const translation = _.get(this.translateService.translations[this.translateService.currentLang], key, defaultValue);
    // console.log(`Translation : ${defaultValue}, ${this.translateService.currentLang}, ${translation}`);
    return translation;
  }
}
