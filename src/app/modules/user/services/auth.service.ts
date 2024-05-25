import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'userToken';
  private readonly USER_ID = 'userId';
  private readonly USER_ROLE = 'userRole';
  private readonly USER_SCOPE = 'userScope';
  private readonly USER_SETUP = 'userSetup';

  private userToken: string | null = null;
  private userId: string | null = null;
  private userRole: string | null = null;
  private userScope: any | null = null;
  private userSetup: any;

  private userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public userInfoData = this.userInfo.asObservable();

  constructor() {
    this.loadAuthData();
  }

  private loadAuthData(): void {
    this.userToken = localStorage.getItem(this.TOKEN_KEY);
    this.userId = localStorage.getItem(this.USER_ID);
    this.userRole = localStorage.getItem(this.USER_ROLE);
    this.userScope = localStorage.getItem(this.USER_SCOPE);
    this.userSetup = localStorage.getItem(this.USER_SETUP);
    this.userSetup = JSON.parse(this.userSetup);
  }

  setUserToken(token: string): void {
    this.userToken = token;
    localStorage.setItem(this.TOKEN_KEY, this.userToken);
  }

  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem(this.USER_ID, this.userId);
  }

  setUserData(data: any) {
    this.userInfo.next(data);
  }

  setUserRole(role: string): void {
    this.userRole = role;
    localStorage.setItem(this.USER_ROLE, this.userRole);
  }

  setUserScope(scope: any): void {
    this.userScope = scope;
    localStorage.setItem(this.USER_SCOPE, this.userScope);
  }
  
  setUserSetup(setup: any): void {
    this.userSetup = setup;
    localStorage.setItem(this.USER_SETUP, JSON.stringify(this.userSetup));
  }

  getUserToken(): string | null {
    return this.userToken;
  }

  getUserId(): string | null {
    return this.userId;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  getUserScope(): any | null {
    return this.userScope;
  }

  getUserSetup() {
    return this.userSetup;
  }

  clearAuthData(): void {
    this.userToken = null;
    this.userRole = null;
    this.userScope = null;
    this.userSetup = null;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ROLE);
    localStorage.removeItem(this.USER_SCOPE);
    localStorage.removeItem(this.USER_SETUP);
  }
}
