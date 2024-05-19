import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { BASE_PATH } from 'src/app/app.tokens';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private userSetupSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public setupData = this.userSetupSubject.asObservable();

  private translationCache: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private translationData = this.translationCache.asObservable();

  private translationURI = 'assets/i18n';
  private accountsSvc = '/accounts-svc/api/v1.0/';

  constructor(private httpClient: HttpClient, @Optional() @Inject(BASE_PATH) private basePath: string) {
    if (this.basePath) {
      this.accountsSvc = this.basePath + this.accountsSvc;
    }
    this.fetchSystemSetup();
  }

  refreshUserSetup(setup: any) {
    this.fetchSystemSetup();
  }

  getUserSetup(): Observable<any> {
    return this.setupData;
  }

  fetchSystemSetup() {
    const URI = `${this.accountsSvc}users/system-setup`;
    this.httpClient.get<any>(URI).subscribe({
      next: (res) => {
        this.userSetupSubject.next(res);
        
        const userLang = res.data?.filter((val: any) => val.categoryName === 'user-language').map((val: any) => val.default)[0];
        this.httpClient.get<any>(`${this.translationURI}/${userLang}.json`).subscribe({
          next: (translations) => {
            this.translationCache.next(translations);
          },
          error: (err) => {
            console.error(`Failed to load the translation data : ${err}`);
          }
        })
      },
      error: (err) => {
        console.error(`Failed to fetch user setup : ${err}`);
      }
    });
  }

  translateText(key: string): Observable<any> {
    return new Observable(observer => {
      this.translationData.subscribe({
        next: (translations) => {
          if (translations) {
            const keys = key.split('.');
            let value = translations;
            for (const k of keys) {
              value = value[k];
              if (!value) break;
            }
            observer.next(value);
            observer.complete();
          }
        },
        error: (err) => {
          console.error(`Failed to load the translation data : ${err}`);
          observer.error(`Failed to load the translation data : ${err}`);
        }
      });
    });
  }

  async translate(key: string): Promise<string> {
    return await firstValueFrom(this.translateText(key));
  }
}
