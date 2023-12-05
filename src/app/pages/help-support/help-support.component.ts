// src/app/pages/help-support.component.ts
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FAQ, Feedback } from '../../models/models';
import { SupportService } from '../../services';

@Component({
    selector: 'app-help-support',
    templateUrl: './help-support.component.html',
    styleUrls: ['./help-support.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class HelpSupportComponent implements OnInit {

    @Input() faqs!: FAQ[];

    constructor(
        private supportService: SupportService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loadFAQs();
    }

    loadFAQs(): void {
        this.supportService.getFAQs().subscribe(
            (faqList: FAQ[]) => {
                this.faqs = faqList;
            },
            error => {
                // Handle error loading FAQs
                console.error('Error loading FAQs:', error);
            }
        );
    }

    openFeedbackDialog(): void {
        const dialogRef = this.dialog.open(FeedbackSubmissionDialog, {
            width: '400px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const feedback = new Feedback(0, result.userId, result.content, new Date());
                this.submitFeedback(feedback);
            }
        });
    }

    submitFeedback(feedback: Feedback): void {
        this.supportService.submitFeedback(feedback).subscribe(
            success => {
                // Handle successful feedback submission
                console.log('Feedback submitted successfully');
            },
            error => {
                // Handle error in feedback submission
                console.error('Error submitting feedback:', error);
            }
        );
    }
}
// // 
// // <!-- src/app/pages/help-support.component.html -->
// <div class="help-support-container">
//     <mat-accordion multi="true" *ngIf="faqs && faqs.length > 0">
//         <mat-expansion-panel *ngFor="let faq of faqs">
//             <mat-expansion-panel-header>
//                 <mat-panel-title>
//                     {{ faq.question }}
//                 </mat-panel-title>
//             </mat-expansion-panel-header>
//             <p>{{ faq.answer }}</p>
//         </mat-expansion-panel>
//     </mat-accordion>
//     <div class="feedback-section">
//         <button mat-raised-button color="primary" (click)="openFeedbackDialog()">
//             フィードバックを送信
//         </button>
//     </div>
// </div>
// // 
// // /* src/app/pages/help-support.component.scss */
// .help-support-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 20px;
// }

// .feedback-section {
//     margin-top: 20px;
// }
// 
// // src/app/dialogs/feedback-submission-dialog.component.ts
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-feedback-submission-dialog',
    // templateUrl: 'feedback-submission-dialog.component.html',
    template: `
       <h1 mat-dialog-title>フィードバックを送信</h1>
       <div mat-dialog-content>
           <mat-form-field>
               <textarea matInput placeholder="フィードバック" [(ngModel)]="data.content"></textarea>
           </mat-form-field>
       </div>
       <div mat-dialog-actions>
           <button mat-button (click)="onNoClick()">キャンセル</button>
           <button mat-button [mat-dialog-close]="data" cdkFocusInitial>送信</button>
       </div>
    `,
    standalone: true,
    imports: [AppCommonModule],
})
export class FeedbackSubmissionDialog {
    constructor(
        public dialogRef: MatDialogRef<FeedbackSubmissionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
// // 
// // <!-- src/app/dialogs/feedback-submission-dialog.component.html -->
// <h1 mat-dialog-title>フィードバックを送信</h1>
// <div mat-dialog-content>
//     <mat-form-field>
//         <textarea matInput placeholder="フィードバック" [(ngModel)]="data.content"></textarea>
//     </mat-form-field>
// </div>
// <div mat-dialog-actions>
//     <button mat-button (click)="onNoClick()">キャンセル</button>
//     <button mat-button [mat-dialog-close]="data" cdkFocusInitial>送信</button>
// </div>
// // 
// // Please note that the above code assumes that you have a `FeedbackSubmissionDialog` component and that the `SupportService` has a `submitFeedback` method that takes a `Feedback` object as a parameter. Adjustments may be needed based on the actual implementation of these components and services. Additionally, the `Feedback` model should include a `userId` property if it is required for the feedback submission process.

