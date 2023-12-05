import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Project, Content, Filter } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://example.com/api'; // Replace with actual API URL

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  searchProjects(query: string, filters: Filter[]): Observable<Project[]> {
    const url = `${this.apiUrl}/search/projects`;
    return this.http.get<{ projects: Project[] }>(url, {
      headers: this.getHeaders(),
      params: { query, filters: JSON.stringify(filters) }
    }).pipe(
      map(response => response.projects.map(project => ({
        ...project,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt)
      })))
    );
  }

  getSuggestedContent(userId: number): Observable<Content[]> {
    const url = `${this.apiUrl}/search/suggested/${userId}`;
    return this.http.get<{ content: Content[] }>(url, {
      headers: this.getHeaders()
    }).pipe(
      map(response => response.content.map(content => ({
        ...content,
        // Assuming 'data' field contains a date string that needs to be converted
        // If 'data' is not a date string, remove this line
        // data: new Date(content.data)
      })))
    );
  }
}


// Please note that the `Content` class and its properties are assumed based on the provided information. If the `Content` class has different properties or if the `data` field is not a date string, you will need to adjust the mapping accordingly. Additionally, the `apiUrl` should be replaced with the actual URL of your API.