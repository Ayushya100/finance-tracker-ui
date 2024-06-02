import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_PATH } from 'src/app/app.tokens';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private accountsSvc = '/accounts-svc/api/v1.0/';

  defaultHeaders = new HttpHeaders();
  private httpOptions = {
    headers: this.defaultHeaders,
    observe: 'body' as 'body',
    reportProgress: false
  };

  constructor(private httpClient: HttpClient, @Optional() @Inject(BASE_PATH) private basePath: string) {
    if (this.basePath) {
      this.accountsSvc = this.basePath + this.accountsSvc;
    }
  }

}
