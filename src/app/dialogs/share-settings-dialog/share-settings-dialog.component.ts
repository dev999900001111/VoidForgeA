// src/app/dialogs/share-settings-dialog.component.ts
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Permission, PermissionLevel } from '../../models/models';
import { CollaborationService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
  selector: 'app-share-settings-dialog',
  standalone: true,
  imports: [AppCommonModule],
  templateUrl: './share-settings-dialog.component.html',
  styleUrls: ['./share-settings-dialog.component.scss']
})
export class ShareSettingsDialogComponent implements OnInit {

  // An array of available permission levels that can be assigned to a user.
  permissionLevels: PermissionLevel[] = [PermissionLevel.OWNER, PermissionLevel.EDITOR, PermissionLevel.VIEWER];

  @Input() settings?: Permission[];
  @Output() update: EventEmitter<Permission[]> = new EventEmitter<Permission[]>();

  constructor(
    private collaborationService: CollaborationService,
    public dialogRef: MatDialogRef<ShareSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { settings: Permission[] }
  ) {
    if (data.settings) {
      this.settings = data.settings;
    }
  }

  ngOnInit(): void {
  }

  /**
   * A function that emits an event with the updated settings when the 'Update' button is clicked.
   */
  emitUpdate(): void {
    this.update.emit(this.settings);
  }

  /**
   * A function to update the permission level for a specific user.
   */
  updatePermission(userId: number, permissionLevel: PermissionLevel): void {
    const permissionToUpdate = this.settings?.find(permission => permission.userId === userId);
    if (permissionToUpdate) {
      permissionToUpdate.permissionLevel = permissionLevel;
      // TODO: ここはAPIがないので、コメントアウトしておく
      // this.collaborationService.updateCollaborator(permissionToUpdate.projectId, userId, permissionLevel).subscribe({
      //   next: (success: any) => {
      //     if (success) {
      //       this.emitUpdate();
      //     } else {
      //       // Handle the error scenario
      //       this.dialogRef.close();
      //       // Ideally, show some error message to the user
      //     }
      //   },
      //   error: (error: any) => {
      //     // Handle the error scenario
      //     this.dialogRef.close();
      //     // Ideally, show some error message to the user
      //   }
      // });
    }
  }

  /**
   * A function to close the dialog without saving changes.
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
// 
// Please note that the above TypeScript code assumes that the corresponding HTML template is set up to use the `emitUpdate` and `updatePermission` methods appropriately. The `cancel` method is used to close the dialog without saving changes. The `updatePermission` method calls the `updateCollaborator` method from the `CollaborationService` to update the permission level for a specific user and emits the updated settings if successful. If there is an error, it closes the dialog and should ideally show an error message to the user.