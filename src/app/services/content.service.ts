import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InteractiveElement } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'http://example.com/api'; // Replace with actual API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getContent(projectId: number): Observable<string> {
    return this.http.get<{ content: string }>(`${this.apiUrl}/content/${projectId}`, { headers: this.getHeaders() })
      .pipe(map(response => response.content));
  }

  updateContent(projectId: number, content: string): Observable<boolean> {
    return this.http.put<{ success: boolean }>(`${this.apiUrl}/content/${projectId}`, { content }, { headers: this.getHeaders() })
      .pipe(map(response => response.success));
  }

  addInteractiveElement(projectId: number, element: InteractiveElement): Observable<InteractiveElement> {
    return this.http.post<{ interactiveElement: InteractiveElement }>(`${this.apiUrl}/content/${projectId}/interactive-elements`, { element }, { headers: this.getHeaders() })
      .pipe(map(response => response.interactiveElement));
  }

  removeInteractiveElement(projectId: number, elementId: number): Observable<boolean> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/content/${projectId}/interactive-elements/${elementId}`, { headers: this.getHeaders() })
      .pipe(map(response => response.success));
  }

  // Additional methods can be added here as needed
}


// This `ContentService` class provides an Angular service with methods to interact with the content-related endpoints of the API. The service methods handle the conversion of the response body to the expected return type and ensure that the authentication token is included in the request headers.