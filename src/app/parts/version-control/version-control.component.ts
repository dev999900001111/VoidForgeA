// src/app/parts/version-control.component.ts
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Version } from '../../models/models';
import { CollaborationService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
  selector: 'app-version-control',
  templateUrl: './version-control.component.html',
  styleUrls: ['./version-control.component.scss'],
  standalone: true,
  imports: [AppCommonModule],
})
export class VersionControlComponent implements OnInit {

  @Input() versions?: Version[];
  @Output() revert = new EventEmitter<Version>();

  constructor(
    private collaborationService: CollaborationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // If versions are not provided as an input, fetch them from the service
    if (!this.versions) {
      // TODO: とりあえず-1を渡しておく
      this.getProjectVersions(-1);
    }
  }

  getProjectVersions(projectId: number): void {
    this.collaborationService.getProjectVersions(projectId).subscribe(
      (versions) => {
        this.versions = versions;
      },
      (error) => {
        console.error('Failed to load project versions. Please try again later.', error);
      }
    );
  }

  onRevertClick(version: Version): void {
    const dialogRef = this.dialog.open(VersionRevertDialog, {
      width: '250px',
      data: { version }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.revertToVersion(version.projectId, version.id);
      }
    });
  }

  revertToVersion(projectId: number, versionId: number): void {
    this.collaborationService.revertToVersion(projectId, versionId).subscribe(
      (success) => {
        if (success) {
          this.revert.emit(this.versions?.find(v => v.id === versionId));
        }
      },
      (error) => {
        console.error('Error reverting to the selected version. Please try again.', error);
      }
    );
  }
}

// Dialog component for reverting to a specific version
@Component({
  selector: 'version-revert-dialog',
  template: `
    <h1 mat-dialog-title>Revert to this version?</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to revert to version {{data.version.versionNumber}}?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Revert</button>
    </div>
  `,
  styles: [`
  .mat-dialog-actions {
    justify-content: flex-end;
  }
  `],
  standalone: true,
  imports: [AppCommonModule],
})
export class VersionRevertDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { version: Version },
    public dialogRef: MatDialogRef<VersionRevertDialog>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
// 
// Please note that the `VersionRevertDialog` component is used within the `VersionControlComponent` to confirm the reversion action. The dialog component is defined within the same file for simplicity, but in a real-world application, it would typically be in its own file. Additionally, the `MAT_DIALOG_DATA` token is used to pass data to the dialog, which would need to be imported from `@angular/material/dialog`.
// 
// The `getProjectVersions` method is called if no versions are provided as an input to the component. This method fetches the versions from the `CollaborationService`. The `onRevertClick` method opens the dialog to confirm the reversion, and if confirmed, the `revertToVersion` method is called to perform the reversion using the `CollaborationService`. If successful, the `revert` event is emitted with the reverted version.
// 
// The error messages are logged to the console, but in a real-world application, you would handle these more gracefully, potentially showing a user-friendly message to the user.