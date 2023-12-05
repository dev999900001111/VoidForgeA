import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Comment, Version } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  private baseUrl = 'http://example.com/api'; // Replace with actual API base URL

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCollaborators(projectId: number): Observable<User[]> {
    return this.http.get<{ collaborators: User[] }>(
      `${this.baseUrl}/projects/${projectId}/collaborators`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.collaborators)
    );
  }

  addCollaborator(projectId: number, userId: number): Observable<boolean> {
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}/projects/${projectId}/collaborators`,
      { userId },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.success)
    );
  }

  removeCollaborator(projectId: number, userId: number): Observable<boolean> {
    return this.http.delete<{ success: boolean }>(
      `${this.baseUrl}/projects/${projectId}/collaborators/${userId}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.success)
    );
  }

  getComments(projectId: number): Observable<Comment[]> {
    return this.http.get<{ comments: Comment[] }>(
      `${this.baseUrl}/projects/${projectId}/comments`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.comments.map(comment => ({
        ...comment,
        createdAt: new Date(comment.createdAt)
      })))
    );
  }

  addComment(projectId: number, comment: Comment): Observable<Comment> {
    return this.http.post<{ comment: Comment }>(
      `${this.baseUrl}/projects/${projectId}/comments`,
      { comment },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({
        ...response.comment,
        createdAt: new Date(response.comment.createdAt)
      }))
    );
  }

  getProjectVersions(projectId: number): Observable<Version[]> {
    return this.http.get<{ versions: Version[] }>(
      `${this.baseUrl}/projects/${projectId}/versions`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.versions.map(version => ({
        ...version,
        createdAt: new Date(version.createdAt)
      })))
    );
  }

  revertToVersion(projectId: number, versionId: number): Observable<boolean> {
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}/projects/${projectId}/versions/${versionId}/revert`,
      {},
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.success)
    );
  }
}


// This `CollaborationService` class provides methods to interact with the collaboration - related endpoints of the API.It includes functions to get collaborators, add or remove a collaborator, get comments, add a comment, get project versions, and revert to a specific version.The service uses the `HttpClient` to make HTTP requests and the `AuthService` to retrieve the authentication token for the request headers.The responses are processed to match the expected return types, including converting date strings to `Date` objects where necessary.