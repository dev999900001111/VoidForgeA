// src/app/parts/account-information.component.ts
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/models';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-account-information',
    templateUrl: './account-information.component.html',
    styleUrls: ['./account-information.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class AccountInformationComponent implements OnInit {

    @Input() user!: User;
    @Output() update = new EventEmitter<User>();

    @ViewChild('profilePictureInput') profilePictureInput?: ElementRef;

    constructor(private userService: UserService, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm): void {
        if (form.valid && this.user) {
            this.userService.updateUser(this.user).subscribe({
                next: (updatedUser) => {
                    this.update.emit(updatedUser);
                    this.snackBar.open('アカウント情報が更新されました。', '閉じる', {
                        duration: 2000,
                    });
                },
                error: () => {
                    this.snackBar.open('アカウント情報の更新に失敗しました。', '閉じる', {
                        duration: 2000,
                    });
                }
            });
        }
    }

    onProfilePictureChange(event: Event): void {
        const element = event.currentTarget as HTMLInputElement;
        let file: File | null = element.files ? element.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (this.user) {
                    // this.user.profilePictureUrl = e.target?.result as string;
                } else { }
            };
            reader.readAsDataURL(file);
        }
    }
}
// 
// Please note that the above TypeScript code assumes that the `UserService` has a method `updateUser` which returns an `Observable<User>`. The `MatSnackBar` is used to display notifications to the user about the success or failure of the update operation. The `onProfilePictureChange` method reads the selected file and updates the `user.profilePictureUrl` with the base64 encoded string of the image, which can then be used to display the preview of the image. The `onSubmit` method sends the updated user information to the server and emits the updated user object to the parent component upon success.