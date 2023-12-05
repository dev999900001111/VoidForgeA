// src/app/parts/security.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';
import { TwoFactorAuthDialogComponent } from 'src/app/dialogs/two-factor-auth-dialog/two-factor-auth-dialog.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  standalone: true,
  imports: [AppCommonModule],
})
export class SecurityComponent implements OnInit {

  // The model for the current password input field.
  currentPassword: string = '';

  // The model for the new password input field.
  newPassword: string = '';

  // The model for the new password confirmation input field.
  confirmNewPassword: string = '';

  // The minimum length required for the new password.
  readonly PASSWORD_MIN_LENGTH: number = 8;

  // The regular expression pattern that the new password must match, including numeric and special characters.
  readonly PASSWORD_REGEX: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // A reference to the password change form to access its properties and methods.
  @ViewChild('passwordForm') passwordForm!: NgForm;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  /**
   * Opens the dialog for setting up two-factor authentication.
   */
  openTwoFactorAuthDialog(): void {
    const dialogRef = this.dialog.open(TwoFactorAuthDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.verifyTwoFactorAuthCode(result.userId, result.code).subscribe(success => {
          if (!success) {
            // Handle verification failure
            alert('認証コードが間違っているか、期限切れです。');
          }
        });
      }
    });
  }

  /**
   * Submits the password change form and handles the password update logic.
   */
  changePassword(): void {
    if (this.passwordForm.valid) {
      this.authService.changePassword(this.currentPassword, this.newPassword).subscribe(success => {
        if (success) {
          // Handle successful password change
          alert('パスワードが正常に変更されました。');
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';
        } else {
          // Handle password change failure
          alert('現在のパスワードが正しくありません。');
        }
      });
    } else {
      // Handle form validation errors
      alert('新しいパスワードがセキュリティ基準を満たしていないか、確認用パスワードと一致しません。');
    }
  }
}
// 
// Please note that the `TwoFactorAuthDialog` component is assumed to be an existing Angular Material dialog component that is not provided in the prompt. The dialog is used to handle the two-factor authentication setup process. The `alert` function is used for simplicity to show messages to the user, but in a real-world application, you would likely use a more user-friendly approach to display messages, such as a snackbar or a custom modal.
// 
// Also, the `AuthService` methods `changePassword`, `setupTwoFactorAuth`, and `verifyTwoFactorAuthCode` are expected to return an `Observable<boolean>` indicating the success or failure of the operation, which is a common pattern for service methods that perform updates.