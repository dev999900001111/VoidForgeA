// src/app/dialogs/two-factor-auth-dialog.component.ts
import { Component, OnInit, Inject, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services';
import { TwoFactorAuthDetails } from '../../models/models';
import { Observable } from 'rxjs';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-two-factor-auth-dialog',
    templateUrl: './two-factor-auth-dialog.component.html',
    styleUrls: ['./two-factor-auth-dialog.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class TwoFactorAuthDialogComponent implements OnInit {
    // A string to hold error messages that may occur during the verification process.
    error: string = '';

    // A reference to the input element for the verification code.
    @ViewChild('verificationCodeInput') verificationCodeInputElement?: ElementRef;

    @Output() setup: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private authService: AuthService,
        public dialogRef: MatDialogRef<TwoFactorAuthDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: TwoFactorAuthDetails
    ) { }

    ngOnInit(): void {
        // If the QR code URL is not provided, request it from the AuthService
        if (!this.data.qrCodeUrl) {
            this.authService.setupTwoFactorAuth(this.data.userId).subscribe(
                (details: TwoFactorAuthDetails) => {
                    this.data = details;
                },
                (error) => {
                    this.error = '二段階認証の設定に失敗しました。後ほどお試しください。'; // Failed to set up two-factor authentication. Please try again later.
                }
            );
        }
    }

    /**
     * A function that takes the verification code input by the user and processes it for verification.
     */
    verifyCode(verificationCode: string): void {
        if (!verificationCode) {
            this.error = 'コードを入力してください。'; // Please enter the code.
            return;
        }

        this.authService.verifyTwoFactorAuthCode(this.data.userId, verificationCode).subscribe(
            (result: boolean) => {
                if (result) {
                    this.setup.emit(true);
                    this.dialogRef.close();
                } else {
                    this.error = '無効なコードです。もう一度お試しください。'; // Invalid code. Please try again.
                }
            },
            (error) => {
                this.error = '二段階認証の確認に失敗しました。後ほどお試しください。'; // Failed to verify two-factor authentication. Please try again later.
            }
        );
    }

    /**
     * Closes the dialog without enabling 2FA.
     */
    cancel(): void {
        this.dialogRef.close();
    }
}
// 
// Please note that the above TypeScript code assumes that the `AuthService` methods `setupTwoFactorAuth` and `verifyTwoFactorAuthCode` are already implemented and return `Observable<TwoFactorAuthDetails>` and `Observable<boolean>`, respectively. The `error` messages are provided in Japanese as per the requirement. The `@Output` event `setup` is emitted with a boolean value indicating whether the 2FA setup was successful. The `cancel` method is provided to close the dialog without enabling 2FA.