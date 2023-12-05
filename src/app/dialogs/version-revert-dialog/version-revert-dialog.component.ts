// src/app/dialogs/version-revert-dialog.component.ts
import { Component, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Version } from '../../models/models';
import { CollaborationService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-version-revert-dialog',
    standalone: true,
    imports: [AppCommonModule],
    templateUrl: './version-revert-dialog.component.html',
    styleUrls: ['./version-revert-dialog.component.scss']
})
export class VersionRevertDialogComponent implements OnInit {

    @Input() version!: Version;
    @Output() revert = new EventEmitter<Version>();

    constructor(
        public dialogRef: MatDialogRef<VersionRevertDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { version: Version },
        private collaborationService: CollaborationService
    ) { }

    ngOnInit(): void {
        // If the version is not provided through @Input, use the version from MAT_DIALOG_DATA
        if (!this.version && this.data && this.data.version) {
            this.version = this.data.version;
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onRevert(): void {
        this.collaborationService.revertToVersion(this.version.projectId, this.version.id).subscribe(
            (success: boolean) => {
                if (success) {
                    this.revert.emit(this.version);
                    this.dialogRef.close();
                } else {
                    // Handle the error scenario, possibly showing an error message to the user
                    // In a real-world scenario, you would handle this with a user-friendly error message
                    console.error('Failed to revert to the selected version.');
                }
            },
            (error) => {
                // Handle the error scenario, possibly showing an error message to the user
                // In a real-world scenario, you would handle this with a user-friendly error message
                console.error('An error occurred while reverting to the selected version:', error);
            }
        );
    }
}
// // 
// // <!-- src/app/dialogs/version-revert-dialog.component.html -->
// <h2 mat-dialog-title>バージョンに戻す</h2>
// <mat-dialog-content class="mat-typography">
//   <p>バージョン {{version.versionNumber}} に戻しますか？この操作は取り消せません。</p>
// </mat-dialog-content>
// <mat-dialog-actions align="end">
//   <button mat-button (click)="onCancel()">キャンセル</button>
//   <button mat-button color="primary" (click)="onRevert()">戻す</button>
// </mat-dialog-actions>
// // 
// // /* src/app/dialogs/version-revert-dialog.component.scss */
// /* Add any specific styles for your dialog here. */
// // 
// // Please note that the HTML template and SCSS file are placeholders and should be updated to match your application's design requirements. The TypeScript code assumes that the `version` can be provided either through an `@Input` property or through `MAT_DIALOG_DATA`. The `onRevert` method handles the actual revert logic by calling the `revertToVersion` method from the `CollaborationService`. If the operation is successful, it emits the `revert` event and closes the dialog. Error handling is rudimentary and should be replaced with proper user feedback mechanisms.