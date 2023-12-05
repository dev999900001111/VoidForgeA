// src/app/pages/collaboration.component.ts
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup, MatTabChangeEvent } from '@angular/material/tabs';
import { Project, User, Comment, Version } from '../../models/models';
import { CollaborationService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';
import { VersionControlComponent } from 'src/app/parts/version-control/version-control.component';
import { CommentsSectionComponent } from 'src/app/parts/comments-section/comments-section.component';
import { SharingSettingsComponent } from 'src/app/parts/sharing-settings/sharing-settings.component';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.scss'],
  standalone: true,
  imports: [AppCommonModule, VersionControlComponent, CommentsSectionComponent, SharingSettingsComponent],
})
export class CollaborationComponent implements OnInit {

  @Input() project!: Project;
  collaborators: User[] = [];
  comments: Comment[] = [];
  versions: Version[] = [];
  selectedTabIndex: number = 0; // Default to the first tab

  @ViewChild('tabGroup', { static: true }) tabGroup!: MatTabGroup;

  constructor(private collaborationService: CollaborationService) { }

  ngOnInit(): void {
    this.loadCollaborators();
    this.loadComments();
    this.loadVersions();
  }

  loadCollaborators(): void {
    this.collaborationService.getCollaborators(this.project.id).subscribe(
      (collaborators: User[]) => {
        this.collaborators = collaborators;
      },
      error => {
        console.error('Error loading collaborators', error);
      }
    );
  }

  loadComments(): void {
    this.collaborationService.getComments(this.project.id).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      },
      error => {
        console.error('Error loading comments', error);
      }
    );
  }

  loadVersions(): void {
    this.collaborationService.getProjectVersions(this.project.id).subscribe(
      (versions: Version[]) => {
        this.versions = versions;
      },
      error => {
        console.error('Error loading project versions', error);
      }
    );
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabIndex = event.index;
  }

  // Additional methods to interact with the child components can be added here
}
// 
// Please note that the `CollaborationComponent` class is now complete with the necessary imports, `@Input` and `@ViewChild` decorators, and the implementation of the `ngOnInit` lifecycle hook to load the initial data. The `onTabChange` method is also implemented to update the selected tab index when the user switches tabs.
// 
// The `loadCollaborators`, `loadComments`, and `loadVersions` methods are responsible for fetching the data from the `CollaborationService` and handling any potential errors. The actual HTML template and stylesheets are not provided here, but they should be created to match the Angular Material design guidelines and to support the Japanese language as specified in the prompt.