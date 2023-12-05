// src/app/dialogs/confirmation-dialog.component.ts
import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-confirmation-dialog',
    standalone: true,
    imports: [AppCommonModule],
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

    // Constants for button labels (assuming translation keys are provided)
    readonly CANCEL_LABEL: string = 'キャンセル';
    readonly CONFIRM_LABEL: string = '確認';

    // EventEmitter for confirm action
    @Output() confirm = new EventEmitter<void>();

    message: string = '';

    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) {
        this.message = data.message;
    }

    // Function to emit the confirm event and close the dialog
    onConfirm(): void {
        this.confirm.emit();
        this.dialogRef.close();
    }

    // Function to close the dialog without emitting the confirm event
    onCancel(): void {
        this.dialogRef.close();
    }
}
// 
// In the TypeScript file above, I've implemented the `ConfirmationDialogComponent` class based on the provided design document. The `@Input` decorator is not used because the message is passed through `MAT_DIALOG_DATA`. The `@Output` decorator is used for the `confirm` event emitter, which emits an event when the user confirms the action. The `onConfirm` method emits the `confirm` event and closes the dialog, while the `onCancel` method simply closes the dialog without emitting the event.
// 
// The `CANCEL_LABEL` and `CONFIRM_LABEL` are assumed to be translation keys for the button labels, which would be used with a translation service or pipe in the template to display the labels in Japanese. The actual translation mechanism is not implemented here, as it would depend on the specific internationalization solution used in the application.
// 
// The `MatDialogRef` is injected to control the opening and closing of the dialog, and `MAT_DIALOG_DATA` is injected to access the data passed to the dialog, which includes the confirmation message.
// 
// Please note that the actual styling (`scss` file) and template (`html` file) are not provided here, as the prompt specifically requested the TypeScript file. The styling and template should be implemented to match the design document and use Angular Material components as specified.