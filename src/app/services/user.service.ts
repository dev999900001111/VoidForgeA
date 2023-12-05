import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, NotificationSetting } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://example.com/api'; // Replace with actual API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/users/${userId}`, { headers: this.getHeaders() })
      .pipe(map(response => response.user));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<{ user: User }>(`${this.apiUrl}/users/${user.id}`, { user }, { headers: this.getHeaders() })
      .pipe(map(response => response.user));
  }

  getUserNotificationSettings(userId: number): Observable<NotificationSetting[]> {
    return this.http.get<{ settings: NotificationSetting[] }>(`${this.apiUrl}/users/${userId}/notifications`, { headers: this.getHeaders() })
      .pipe(map(response => response.settings));
  }

  updateUserNotificationSettings(userId: number, settings: NotificationSetting[]): Observable<boolean> {
    return this.http.put<{ success: boolean }>(`${this.apiUrl}/users/${userId}/notifications`, { settings }, { headers: this.getHeaders() })
      .pipe(map(response => response.success));
  }

  // Additional methods can be added below as needed
}


// This `UserService` class provides methods to interact with the user-related endpoints of the API. It uses the `HttpClient` to make HTTP requests and the `AuthService` to retrieve the authentication token. The `map` operator is used to transform the response to match the expected return type of the service methods. Additional methods can be added to the service class as needed to cover other user-related functionalities.