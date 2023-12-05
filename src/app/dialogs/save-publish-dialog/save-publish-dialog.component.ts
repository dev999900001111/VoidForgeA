// src/app/dialogs/save-publish-dialog.component.ts
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
  selector: 'app-save-publish-dialog',
  standalone: true,
  imports: [AppCommonModule],
  templateUrl: './save-publish-dialog.component.html',
  styleUrls: ['./save-publish-dialog.component.scss']
})
export class SavePublishDialogComponent {

  @Output() save = new EventEmitter<void>();
  @Output() publish = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<SavePublishDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void { }

  onSave(): void {
    this.save.emit();
    this.dialogRef.close();
  }

  onPublish(): void {
    this.publish.emit();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
// // 
// // <!-- src/app/dialogs/save-publish-dialog.component.html -->
// <h2 mat-dialog-title>プロジェクトの保存または公開</h2>
// <mat-dialog-content>
//   <p>プロジェクトを保存するか、公開して他のユーザーや公開にするか選択してください。</p>
// </mat-dialog-content>
// <mat-dialog-actions align="end">
//   <button mat-button (click)="onCancel()">キャンセル</button>
//   <button mat-button color="primary" (click)="onSave()">保存</button>
//   <button mat-button color="accent" (click)="onPublish()">公開</button>
// </mat-dialog-actions>
// // 
// // /* src/app/dialogs/save-publish-dialog.component.scss */
// /* Add any specific styles for your dialog here */
// // 
// // Please note that the HTML and SCSS files are placeholders and should be updated to match your application's design requirements. The TypeScript component class is set up to handle the basic functionality of emitting events for saving and publishing, as well as closing the dialog. The actual implementation of saving and publishing should be handled in the parent component that uses this dialog.