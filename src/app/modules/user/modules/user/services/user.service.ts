import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_PATH } from 'src/app/app.tokens';

@Injectable({
  providedIn: 'root'
})
export class UserGeneralService {

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

  updateUserInfo(userId: string, payload: any): Observable<any> {
    const URI = `${this.accountsSvc}users/user-info/${userId}`;
    return this.httpClient.put<any>(URI, payload, this.httpOptions);
  }

  updateUserPassword(userId: string, payload: any): Observable<any> {
    const URI = `${this.accountsSvc}users/user-password/${userId}`;
    return this.httpClient.put<any>(URI, payload, this.httpOptions);
  }

  updateUserImage(userId: string, formData: any): Observable<any> {
    const URI = `${this.accountsSvc}users/profile-image/${userId}`;
    return this.httpClient.put<any>(URI, formData);
  }

  deleteUserImage(userId: string): Observable<any> {
    const URI = `${this.accountsSvc}users/profile-image/${userId}`;
    return this.httpClient.delete<any>(URI, this.httpOptions);
  }

  deactivateUserAccount(userId: string, payload: any): Observable<any> {
    const URI = `${this.accountsSvc}users/deactivate-user/${userId}`;
    return this.httpClient.put<any>(URI, payload, this.httpOptions);
  }

  getUserSetup(userId: string): Observable<any> {
    const URI = `${this.accountsSvc}users/${userId}/user-setup`;
    return this.httpClient.get<any>(URI, this.httpOptions);
  }

  updateUserSetup(userId: string, payload: any): Observable<any> {
    const URI = `${this.accountsSvc}users/${userId}/user-setup`;
    return this.httpClient.put(URI, payload, this.httpOptions);
  }

}
