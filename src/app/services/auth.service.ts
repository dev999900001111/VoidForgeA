import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User, TwoFactorAuthDetails, PermissionLevel, UserRole } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '';

  private user!: User;

  constructor(private http: HttpClient) {
  }

  public getToken(): string {
    // Assuming the token is stored in local storage
    return localStorage.getItem('auth_token') || '';
  }

  public getCurrentUser(): User {
    // Assuming the token is stored in local storage
    if (this.user) return this.user;
    throw new Error('User not found');
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
  }


  // --- ここから下は認証前とかユーザー登録とかの処理

  /**
   * ログイン処理。
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string): Observable<User> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<{ user: User, token: string }>(url, { email, password })
      .pipe(map(response => {
        localStorage.setItem('auth_token', response.token);
        this.user = response.user;
        return response.user;
      }));
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  /**
   * ユーザー登録相当の処理。
   * メールアドレスに確認メールを送信する。
   * @param email 
   * @returns 
   */
  requestForPasswordReset(email: string): Observable<void> {
    const url = `${this.apiUrl}/request-for-password-reset`;
    return this.http.post<void>(url, { email });
  }

  /**
   * 確認メールからのリンクをクリックしたときの処理。
   * パスワードリセット用のワンタイムトークンを発行する。
   * @param type 
   * @param token 
   * @returns 
   */
  onetimeLogin(type: string, token: string): Observable<string> {
    const url = `${this.apiUrl}/onetime`;
    return this.http.post<{ token: string }>(url, { type, token })
      .pipe(map(response => {
        localStorage.setItem(`${type}_token`, response.token);
        return response.token;
      }));
  }

  /**
   * パスワードリセット処理。
   * @param password 
   * @param passwordConfirm 
   * @returns 
   */
  passwordReset(password: string, passwordConfirm: string): Observable<{ token: string, message: string }> {
    if (password === passwordConfirm) {
    } else {
      throw new Error('Password does not match');
    }
    const url = `${this.apiUrl}/invite/password-reset`;
    return this.http.post<{ token: string, message: string }>(url,
      { password, passwordConfirm },
      { headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('invite_token')}` }) }
    ).pipe(map(response => {
      localStorage.removeItem('invite_token');
      localStorage.setItem('auth_token', response.token);
      return response;
    }));
  }

  // --- ここから下は普通にユーザー情報の取得とか更新とかの処理

  /**
   * ユーザー情報を取得する。
   * @returns
   */
  getUser(): Observable<User> {
    const url = `${this.apiUrl}/user/user`;
    return this.http.get<User>(url, { headers: this.getHeaders() })
      .pipe(tap(response => this.user = response));
  }


  /**
   * ユーザー情報を更新する。
   * @param user 
   * @returns 
   */
  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/user/user`;
    return this.http.patch<{ user: User, message: string }>(url, { user }, { headers: this.getHeaders() })
      .pipe(map(response => response.user));
  }

  /**
   * パスワードを変更する。
   * @param oldPassword 
   * @param newPassword 
   * @returns 
   */
  changePassword(oldPassword: string, newPassword: string): Observable<User> {
    const url = `${this.apiUrl}/user/change-password`;
    return this.http.patch<{ user: User, message: string }>(url, { oldPassword, newPassword }, { headers: this.getHeaders() })
      .pipe(map(response => response.user));
  }

  /**
   * ユーザーを削除する。
   * @returns 
   */
  deleteUser(): Observable<void> {
    const url = `${this.apiUrl}/user/user`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }

  // ----


  setupTwoFactorAuth(userId: number): Observable<TwoFactorAuthDetails> {
    const url = `${this.apiUrl}/auth/setup-two-factor`;
    return this.http.post<{ twoFactorAuthDetails: TwoFactorAuthDetails }>(url, { userId }, { headers: this.getHeaders() })
      .pipe(map(response => response.twoFactorAuthDetails));
  }

  verifyTwoFactorAuthCode(userId: number, code: string): Observable<boolean> {
    const url = `${this.apiUrl}/auth/verify-two-factor`;
    return this.http.post<{ success: boolean }>(url, { userId, code }, { headers: this.getHeaders() })
      .pipe(map(response => response.success));
  }

  // Additional methods can be added below as needed
}


// This `AuthService` class provides the basic authentication functionalities for an Angular application, including login, logout, registration, profile update, password change, and two - factor authentication setup and verification.The `getToken` and `getHeaders` methods are used to retrieve the authentication token and construct the headers for HTTP requests, respectively.The`map` operator is used to transform the response to match the expected return type of the service methods.