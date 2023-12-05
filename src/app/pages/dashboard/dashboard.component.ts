// src/app/pages/dashboard.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project, User } from '../../models/models';
import { AuthService, ProjectService, UserService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { HeaderComponent } from 'src/app/parts/header/header.component';
import { FooterComponent } from 'src/app/parts/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [AppCommonModule, HeaderComponent, FooterComponent],
})
export class DashboardComponent implements OnInit {

  @Input() user!: User;
  @Input() projects!: Project[];
  @Output() select = new EventEmitter<Project>();

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    if (this.user && this.user.id) {
      this.projectService.getProjects(this.user.id).subscribe({
        next: next => {
          this.projects = next;
        },
        error: error => {
          // Handle error scenario
          console.error('Error loading projects:', error);
        }
      });
    }
  }

  onLogout(): void {
    // Emit an event or call a service to perform logout
    this.authService.logout();
  }

  openConfirmationDialog(projectId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'プロジェクトを削除してもよろしいですか？' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(projectId);
      }
    });
  }

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe({
      next: (success) => {
        if (success) {
          this.projects = this.projects.filter(project => project.id !== projectId);
        }
      },
      error: (error) => {
        // Handle error scenario
        console.error('Error deleting project:', error);
      }
    });
  }

  navigateToProjectCreation(): void {
    // Navigate to ProjectCreationEditComponent with a new project context
    this.router.navigate(['/project-creation']);
  }

  editProject(project: Project): void {
    this.select.emit(project);
    // Navigate to ProjectCreationEditComponent with the selected project for editing
    this.router.navigate(['/project-creation']);
  }
}