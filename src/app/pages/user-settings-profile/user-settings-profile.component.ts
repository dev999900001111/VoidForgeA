// src/app/pages/user-settings-profile.component.ts
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppCommonModule } from 'src/app/app-common.module';
import { UserService } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-settings-profile',
    templateUrl: './user-settings-profile.component.html',
    styleUrls: ['./user-settings-profile.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class UserSettingsProfileComponent implements OnInit {

    @Input() user!: User;
    @Output() update = new EventEmitter<User>();

    @ViewChild('profilePictureInput') profilePictureInput!: ElementRef;

    // A constant for the title of the account settings card, which is "アカウント設定" in Japanese.
    readonly ACCOUNT_SETTINGS_TITLE = 'アカウント設定';

    constructor(private userService: UserService, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    onProfilePictureChange(event: Event): void {
        const element = event.currentTarget as HTMLInputElement;
        let file = element.files ? element.files[0] : null;
        if (file) {
            // Assuming there's a method to handle the file upload and return the URL
            this.uploadProfilePicture(file).subscribe(
                (profilePictureUrl: string) => {
                    // this.user.profilePictureUrl = profilePictureUrl;
                    this.snackBar.open('プロフィール写真が更新されました。', '閉じる', { duration: 2000 });
                },
                (error: any) => {
                    this.snackBar.open('プロフィール写真のアップロードに失敗しました。', '閉じる', { duration: 2000 });
                }
            );
        }
    }

    onSaveChanges(): void {
        this.userService.updateUser(this.user).subscribe(
            (updatedUser: User) => {
                this.update.emit(updatedUser);
                this.snackBar.open('アカウント設定が更新されました。', '閉じる', { duration: 2000 });
            },
            error => {
                this.snackBar.open('アカウント設定の更新に失敗しました。', '閉じる', { duration: 2000 });
            }
        );
    }

    private uploadProfilePicture(file: File): Observable<string> {
        // This method should be implemented to handle the file upload process
        // and return an Observable that emits the URL of the uploaded profile picture.
        // For the purpose of this example, we'll just simulate an upload and return an Observable.
        return new Observable<string>(observer => {
            // Simulate a delay for the upload
            setTimeout(() => {
                const fakeUrl = 'https://example.com/profile-picture.jpg';
                observer.next(fakeUrl);
                observer.complete();
            }, 2000);
        });
    }
}
// 
// Please note that the `uploadProfilePicture` method is a placeholder and should be implemented according to your backend API's file upload mechanism. The `MatSnackBar` is used to show feedback to the user upon successful or failed updates. The `onSaveChanges` method is called when the user clicks the save button to submit the form. The `onProfilePictureChange` method is triggered when the user selects a new profile picture file.