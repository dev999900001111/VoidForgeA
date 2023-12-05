import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project, ProjectStatus } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://example.com/api'; // Replace with actual API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProjects(userId: number): Observable<Project[]> {
    return this.http.get<{ projects: Project[] }>(`${this.apiUrl}/projects/user/${userId}`, { headers: this.getHeaders() })
      .pipe(map(response => response.projects.map(project => this.mapProject(project))));
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<{ project: Project }>(`${this.apiUrl}/projects`, { project }, { headers: this.getHeaders() })
      .pipe(map(response => this.mapProject(response.project)));
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<{ project: Project }>(`${this.apiUrl}/projects/${project.id}`, { project }, { headers: this.getHeaders() })
      .pipe(map(response => this.mapProject(response.project)));
  }

  deleteProject(projectId: number): Observable<boolean> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/projects/${projectId}`, { headers: this.getHeaders() })
      .pipe(map(response => response.success));
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<{ project: Project }>(`${this.apiUrl}/projects/${projectId}`, { headers: this.getHeaders() })
      .pipe(map(response => this.mapProject(response.project)));
  }

  publishProject(projectId: number): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/projects/${projectId}/publish`, {}, { headers: this.getHeaders() })
      .pipe(map(response => response.success));
  }

  // Additional methods based on the API list
  changeProjectStatus(projectId: number, status: ProjectStatus): Observable<boolean> {
    return this.http.put<{ success: boolean }>(`${this.apiUrl}/projects/${projectId}/status`, { status }, { headers: this.getHeaders() })
      .pipe(map(response => response.success));
  }

  // Helper method to map the project response to the Project model
  private mapProject(projectData: any): Project {
    return new Project(
      projectData.id,
      projectData.name,
      projectData.description,
      projectData.ownerId,
      projectData.templateId,
      projectData.content,
      projectData.status,
      projectData.collaborators,
      new Date(projectData.createdAt),
      new Date(projectData.updatedAt)
    );
  }
}


// This `ProjectService` class provides methods to interact with the backend API for project-related operations. It includes methods to get projects, create a new project, update an existing project, delete a project, get a project by ID, and publish a project. Additional methods can be added as needed based on the API list provided. The `mapProject` helper method is used to convert the project data from the API response to the `Project` model, ensuring that date strings are properly converted to `Date` objects. The `getHeaders` method is used to retrieve the authorization token from the `AuthService` and set it in the request headers.