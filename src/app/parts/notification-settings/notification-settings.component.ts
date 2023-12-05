// src/app/parts/notification-settings.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationSetting, NotificationType } from '../../models/models';
import { AuthService, UserService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-notification-settings',
    templateUrl: './notification-settings.component.html',
    styleUrls: ['./notification-settings.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class NotificationSettingsComponent implements OnInit {

    @Input() notifications!: NotificationSetting[];
    @Output() update = new EventEmitter<NotificationSetting>();

    constructor(private authService: AuthService, private userService: UserService) {
    }

    ngOnInit(): void {
        // Assuming the user ID is known and stored, for example, in a user service or via some authentication service.
        // This is a placeholder value and should be replaced with the actual user ID.
        const userId = this.authService.getCurrentUser().id; // This method should exist in the UserService to get the current user's ID.
        this.userService.getUserNotificationSettings(userId).subscribe(
            (settings) => {
                this.notifications = settings;
            },
            (error) => {
                console.error('Failed to load notification settings', error);
            }
        );
    }

    /**
     * A method that takes a notification type and returns the corresponding user-friendly label in Japanese.
     */
    getNotificationTypeLabel(type: NotificationType): string {
        switch (type) {
            case NotificationType.EMAIL:
                return 'メール';
            case NotificationType.SMS:
                return 'SMS';
            case NotificationType.PUSH_NOTIFICATION:
                return 'プッシュ通知';
            default:
                return '不明な通知タイプ';
        }
    }

    /**
     * Handles the toggle change event for notification settings.
     */
    onToggleNotificationSetting(setting: NotificationSetting): void {
        this.userService.updateUserNotificationSettings(setting.userId, [setting]).subscribe(
            (success) => {
                if (success) {
                    this.update.emit(setting);
                } else {
                    console.error('Failed to update notification setting');
                }
            },
            (error) => {
                console.error('Failed to update notification setting', error);
            }
        );
    }
}
// 
// Please note that the `getCurrentUserId` method is assumed to be part of the `UserService` and should be implemented to return the current user's ID. The actual implementation of this method would depend on how user authentication and session management are handled in the application.
// 
// Also, the `onToggleNotificationSetting` method is designed to handle the toggle change event for each notification setting. It calls the `updateUserNotificationSettings` method from the `UserService` to update the setting on the backend and emits an update event if successful. If there is an error, it logs the error to the console. The actual error handling and user feedback mechanisms may need to be more sophisticated in a production environment.