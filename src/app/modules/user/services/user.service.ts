import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_PATH } from 'src/app/app.tokens';
import { AuthService } from './auth.service';

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

  // TODO - refresh token needs to be changed later to pass the token from cookie

  constructor(private httpClient: HttpClient, @Optional() @Inject(BASE_PATH) private basePath: string,
    private authService: AuthService
  ) {
    if (this.basePath) {
      this.accountsSvc = this.basePath + this.accountsSvc;
    }
  }

  getUserInfo(userId: any): Observable<any> {
    const URI = `${this.accountsSvc}users/user-info/${userId}`;
    return this.httpClient.get<any>(URI, this.httpOptions);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.authService.getRefreshToken();
    const URI = `${this.accountsSvc}users/refresh-token`;
    const body = {
      refreshToken: refreshToken
    };

    return this.httpClient.post<any>(URI, body, this.httpOptions);
  }

  logoutUser(): Observable<any> {
    const URI = `${this.accountsSvc}users/logout-user`;
    return this.httpClient.post<any>(URI, this.httpOptions);
  }

}
