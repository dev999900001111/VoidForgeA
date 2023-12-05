import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FAQ, Feedback } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiUrl = 'http://example.com/api'; // Replace with actual API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getFAQs(): Observable<FAQ[]> {
    return this.http.get<{ faqs: FAQ[] }>(`${this.apiUrl}/support/faqs`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.faqs.map(faq => new FAQ(faq.id, faq.question, faq.answer)))
      );
  }

  submitFeedback(feedback: Feedback): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/support/feedback`, { feedback }, { headers: this.getHeaders() })
      .pipe(
        map(response => response.success)
      );
  }

  // Additional methods can be added here as needed
}


// This `SupportService` class includes the necessary imports and two methods, `getFAQs` and `submitFeedback`, which correspond to the endpoints defined in the API list. The `getFAQs` method retrieves a list of FAQs and maps the response to an array of `FAQ` instances. The `submitFeedback` method sends feedback and maps the response to a boolean indicating success. The `getHeaders` method is used to retrieve the authorization token from the `AuthService` and set the appropriate headers for the HTTP requests. Additional methods can be added to this service as needed to support other functionality related to support services.