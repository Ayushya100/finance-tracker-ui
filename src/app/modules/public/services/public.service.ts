import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BASE_PATH } from 'src/app/app.tokens';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private accountsSvc = '/accounts-svc/api/v1.0/';

  defaultHeaders = new HttpHeaders();
  private httpOptions = {
    headers: this.defaultHeaders,
    observe: 'body' as 'body',
    reportProgress: false
  };

  constructor(private httpClient: HttpClient, @Optional() @Inject(BASE_PATH) private basePath: string) {
    if (basePath) {
      this.accountsSvc = basePath + this.accountsSvc;
    }
  }

  registerUser(payload: any) {
    const URI = `${this.accountsSvc}users/register-user`;
    return this.httpClient.post<any>(URI, payload, this.httpOptions);
  }

  verifyUser(userId: any, payload: any) {
    const URI = `${this.accountsSvc}users/${userId}/verify-user`;
    return this.httpClient.put<any>(URI, payload, this.httpOptions);
  }

  loginUser(payload: any) {
    const URI = `${this.accountsSvc}users/login-user`;
    return this.httpClient.post<any>(URI, payload, this.httpOptions);
  }

}
