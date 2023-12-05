// src/app/dialogs/feedback-submission-dialog.component.ts
import { Component, EventEmitter, Inject, Output, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { SupportService } from '../../services';
import { Feedback } from '../../models/models';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-feedback-submission-dialog',
    standalone: true,
    imports: [AppCommonModule],
    templateUrl: './feedback-submission-dialog.component.html',
    styleUrls: ['./feedback-submission-dialog.component.scss']
})
export class FeedbackSubmissionDialogComponent {

    // FormControl for the feedback input with required validator.
    feedbackControl = new FormControl('', [Validators.required]);

    // Translation keys for the button labels.
    readonly CANCEL_LABEL = 'キャンセル';
    readonly SEND_LABEL = '送信';

    @Output() submit = new EventEmitter<Feedback>();

    constructor(
        private supportService: SupportService,
        public dialogRef: MatDialogRef<FeedbackSubmissionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    /**
     * Called when the user submits the form. Handles the logic for what happens when the feedback is submitted.
     */
    onSubmit(): void {
        if (this.feedbackControl.valid) {
            const feedback = new Feedback(-1, this.data.userId, this.feedbackControl.value || '', new Date());
            this.supportService.submitFeedback(feedback).subscribe(success => {
                if (success) {
                    this.submit.emit(feedback);
                    this.dialogRef.close();
                } else {
                    // Handle the error case
                }
            });
        }
    }

    /**
     * Closes the dialog without submitting any feedback.
     */
    onCancel(): void {
        this.dialogRef.close();
    }

    /**
     * Returns a boolean indicating whether the feedback input is valid or not.
     * This function is used to enable or disable the send button.
     */
    isFeedbackValid(): boolean {
        return this.feedbackControl.valid;
    }
}
// // 
// // <!-- src/app/dialogs/feedback-submission-dialog.component.html -->
// <h2 mat - dialog - title > {{ 'フィードバックの送信' }}</h2>
//     < mat - dialog - content >
//     <mat-form - field appearance = "fill" >
//         <mat-label > {{ 'フィードバック' }}</mat-label>
//             < textarea matInput[formControl] = "feedbackControl" placeholder = "{{ 'あなたの意見をお聞かせください。' }}" > </textarea>
//                 < mat - error * ngIf="feedbackControl.hasError('required')" >
//                     {{ 'フィードバックを入力してください。' }}
// </mat-error>
//     < /mat-form-field>
//     < /mat-dialog-content>
//     < mat - dialog - actions align = "end" >
//         <button mat - button(click)="onCancel()" > {{ CANCEL_LABEL }}</button>
//             < button mat - button color = "primary"[disabled] = "!isFeedbackValid()"(click) = "onSubmit()" > {{ SEND_LABEL }}</button>
//                 < /mat-dialog-actions>
// // 
// // Please note that the `Feedback` class constructor in the TypeScript code assumes that the `id` can be `null` when creating a new feedback instance, as it would typically be assigned by the backend upon successful submission. The `userId` is expected to be passed through the `MAT_DIALOG_DATA` when opening the dialog.
// // 
// // The HTML template uses Angular Material components to create a polished design. The `mat-dialog-title`, `mat-dialog-content`, and `mat-dialog-actions` are used to structure the dialog. The `mat-form-field` and `textarea` with `matInput` directive are used for the input field, and `mat-error` is used to display validation errors. The `mat-button` components are styled with Material Design and the primary color is applied to the submit button.
// // 
// // The `onSubmit` method handles the submission of the feedback to the `SupportService`. If the submission is successful, the feedback is emitted through the `submit` event and the dialog is closed. The `onCancel` method simply closes the dialog without submitting anything. The `isFeedbackValid` method is used to enable or disable the submit button based on the validity of the feedback input.