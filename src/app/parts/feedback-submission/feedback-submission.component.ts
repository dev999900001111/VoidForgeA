// src/app/parts/feedback-submission.component.ts
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from '../../models/models';
import { SupportService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-feedback-submission',
    templateUrl: './feedback-submission.component.html',
    styleUrls: ['./feedback-submission.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class FeedbackSubmissionComponent {

    feedback: Feedback = new Feedback(0, 0, '', new Date()); // Assuming 0 as placeholders for id and userId
    MIN_FEEDBACK_LENGTH: number = 10;

    @Output() submit = new EventEmitter<Feedback>();

    @ViewChild('feedbackForm') feedbackForm!: NgForm;

    constructor(private supportService: SupportService, private snackBar: MatSnackBar) {
    }

    onSubmit() {
        if (this.feedbackForm.valid) {
            this.supportService.submitFeedback(this.feedback).subscribe(
                success => {
                    if (success) {
                        this.snackBar.open('フィードバックが正常に送信されました。', '閉じる', { duration: 3000 });
                        this.submit.emit(this.feedback);
                        this.feedbackForm.resetForm();
                    } else {
                        this.snackBar.open('フィードバックの送信に失敗しました。後でもう一度お試しください。', '閉じる', { duration: 3000 });
                    }
                },
                error => {
                    this.snackBar.open('フィードバックの送信に失敗しました。後でもう一度お試しください。', '閉じる', { duration: 3000 });
                }
            );
        } else {
            this.snackBar.open('フィードバックは空にできません。', '閉じる', { duration: 3000 });
        }
    }
}
// 
// In this TypeScript code for the `FeedbackSubmissionComponent`, we have:
// 
// - Defined a `feedback` object of type `Feedback` to hold the feedback content. We're assuming `0` as placeholders for `id` and `userId` since they are not provided in the context.
// - Set a minimum feedback length constant `MIN_FEEDBACK_LENGTH`.
// - Used `@Output` to emit the `submit` event with the feedback data when the form is submitted.
// - Used `@ViewChild` to get a reference to the `NgForm` directive from the template.
// - Injected `SupportService` for submitting feedback and `MatSnackBar` for showing notifications to the user.
// - Implemented the `onSubmit` method to validate the form, submit the feedback, and handle the response by showing appropriate messages to the user.
// 
// Please note that the actual HTML template and styles (`feedback-submission.component.html` and `feedback-submission.component.scss`) are not provided here, but they should be created to match the Angular Material design and to include the necessary form controls and validation messages as described in the design document.