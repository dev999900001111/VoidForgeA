import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Template } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private apiUrl = 'http://example.com/api/templates'; // Replace with actual API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTemplates(): Observable<Template[]> {
    return this.http.get<{ templates: Template[] }>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(map(response => response.templates));
  }

  getTemplateById(templateId: number): Observable<Template> {
    const url = `${this.apiUrl}/${templateId}`;
    return this.http.get<{ template: Template }>(url, { headers: this.getHeaders() })
      .pipe(map(response => response.template));
  }

  // Additional methods can be added below as needed
}


// This `TemplateService` class provides two methods: `getTemplates` and `getTemplateById`, which correspond to the HTTP API endpoints for retrieving all templates and a single template by ID, respectively. The service methods use the `HttpClient` to make the requests and include an `Authorization` header with a bearer token obtained from the `AuthService`. The `map` operator is used to transform the response to match the expected return type of the service methods. Additional methods can be added to the service class as needed to support other operations related to templates.