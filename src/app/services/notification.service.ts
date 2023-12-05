import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://example.com/api'; // Replace with actual API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  sendNotification(userId: number, notification: Notification): Observable<boolean> {
    const url = `${this.apiUrl}/notifications/send`;
    const body = { userId, notification };
    return this.http.post<{ success: boolean }>(url, body, { headers: this.getHeaders() })
      .pipe(map(response => response.success));
  }

  // Add additional functions as needed below
  // ...

  // Example of a function that might be added
  getNotificationsForUser(userId: number): Observable<Notification[]> {
    const url = `${this.apiUrl}/users/${userId}/notifications`;
    return this.http.get<{ notifications: Notification[] }>(url, { headers: this.getHeaders() })
      .pipe(map(response => response.notifications.map(notification => {
        // Convert the createdAt string to a Date object
        return new Notification(
          notification.id,
          notification.recipientId,
          notification.message,
          new Date(notification.createdAt)
        );
      })));
  }
}


// This `NotificationService` class includes the `sendNotification` method as defined in the service class definition. I've also added an example of an additional function, `getNotificationsForUser`, which retrieves notifications for a specific user and maps the `createdAt` string to a `Date` object, as per the model class definition. You can add more functions as needed following this pattern. Remember to replace the `apiUrl` with the actual URL of your API.