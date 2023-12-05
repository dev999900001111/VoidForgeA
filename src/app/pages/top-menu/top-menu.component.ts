import { Component } from '@angular/core';
import { ProjectModelService } from 'src/app/services/project-model.service';
import { Project, ProjectStatus } from 'src/app/models/project-model';
import { AppCommonModule } from 'src/app/app-common.module';
import { Router, RouterModule } from '@angular/router';
import { GService } from 'src/app/services/g.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from 'src/app/dialogs/create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  standalone: true,
  imports: [AppCommonModule, RouterModule, MatDialogModule],
})
export class TopMenuComponent {

  projectList: Project[] = [];
  constructor(
    private projectModelService: ProjectModelService,
    private route: Router,
    public g: GService,
    public dialog: MatDialog,
  ) {
    this.reload();
  }
  reload(): void {
    this.projectModelService.getProjectList().subscribe((projects) => {
      this.projectList = projects;
      console.log(projects);
    });
  }

  selectProject(project: Project): void {
    if (this.g.projectModel && this.g.projectModel.id === project.id) {
      // 何もしないで画面遷移
      this.route.navigate([`/project-creation-edit/step01-requirements/${project.id}`]);
    } else {
      // プロジェクトを読み込んでから画面遷移
      this.projectModelService.getProjectDeep(project.id).subscribe((projectDeep) => {
        this.g.projectModel = projectDeep;
        console.log(projectDeep);
        this.route.navigate([`/project-creation-edit/step01-requirements/${project.id}`]);
      });
    }
  }
  createProject(): void {
    this.dialog.open(CreateProjectDialogComponent, {
      width: '600px',
      height: '600px',
    }).afterClosed().subscribe((result: Project) => {
      if (result) {
        this.projectModelService.createProjectDeep(result).subscribe({
          next: (project) => {
            console.log('Project created');
            this.reload();
            this.selectProject(project);
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Project created complete');
          },
        });
      } else {
        console.log('No project created');
      }
    });
  }

  deleteProject($event: MouseEvent, project: Project): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.projectModelService.deleteProject(project.id).subscribe(() => {
      console.log('Project deleted');
      this.reload();
    });
  }
}
