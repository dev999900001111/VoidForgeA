
# Reference


## Model and Service classes

```typescript
export enum UserRole {ADMIN = 'ADMIN',USER = 'USER',GUEST = 'GUEST'}
export enum ProjectStatus {ACTIVE = 'ACTIVE',ARCHIVED = 'ARCHIVED',DELETED = 'DELETED'}
export enum PermissionLevel {OWNER = 'OWNER',EDITOR = 'EDITOR',VIEWER = 'VIEWER'}
export enum NotificationType {EMAIL = 'EMAIL',SMS = 'SMS',PUSH_NOTIFICATION = 'PUSH_NOTIFICATION'}
export enum FilterType {CATEGORY = 'CATEGORY',DATE = 'DATE',STATUS = 'STATUS'}
export enum ContentType {TEXT = 'TEXT',IMAGE = 'IMAGE',VIDEO = 'VIDEO',AUDIO = 'AUDIO'}
export enum InteractiveElementType {QUIZ = 'QUIZ',POLL = 'POLL',SURVEY = 'SURVEY',FORM = 'FORM'}
export class User {constructor(public id: number,public name: string,public email: string,public role: UserRole,public profilePictureUrl: string) {}}
export class Project {constructor(public id: number,public name: string,public description: string,public ownerId: number,public templateId: number,public content: string,public status: ProjectStatus,public collaborators: User[],public createdAt: Date,public updatedAt: Date) {}}
export class Comment {constructor(public id: number,public authorId: number,public projectId: number,public content: string,public createdAt: Date) {}}
export class Version {constructor(public id: number,public projectId: number,public versionNumber: number,public createdAt: Date) {}}
export class Permission {constructor(public userId: number,public projectId: number,public permissionLevel: PermissionLevel) {}}
export class Template {constructor(public id: number,public name: string,public description: string,public thumbnailUrl: string) {}}
export class NotificationSetting {constructor(public userId: number,public type: NotificationType,public enabled: boolean) {}}
export class Filter {constructor(public type: FilterType,public value: string) {}}
export class Content {constructor(public id: number,public projectId: number,public type: ContentType,public data: string) {}}
export class InteractiveElement {constructor(public id: number,public projectId: number,public type: InteractiveElementType,public data: string) {}}
export class FAQ {constructor(public id: number,public question: string,public answer: string) {}}
export class Feedback {constructor(public id: number,public userId: number,public content: string,public createdAt: Date) {}}
export class TwoFactorAuthDetails {constructor(public userId: number,public secret: string,public qrCodeUrl: string) {}}
export class Notification {constructor(public id: number,public recipientId: number,public message: string,public createdAt: Date) {}}
class includes
// src/app/services/auth-service.ts
export interface AuthService {login(email: string, password: string): Observable<User>;
logout(): void;
register(user: User): Observable<User>;
updateProfile(user: User): Observable<User>;
changePassword(oldPassword: string, newPassword: string): Observable<boolean>;
setupTwoFactorAuth(userId: number): Observable<TwoFactorAuthDetails>;
verifyTwoFactorAuthCode(userId: number, code: string): Observable<boolean>;
}

class provides
// src/app/services/collaboration-service.ts
export interface CollaborationService {getCollaborators(projectId: number): Observable<User[]>;
addCollaborator(projectId: number, userId: number): Observable<boolean>;
removeCollaborator(projectId: number, userId: number): Observable<boolean>;
getComments(projectId: number): Observable<Comment[]>;
addComment(projectId: number, comment: Comment): Observable<Comment>;
getProjectVersions(projectId: number): Observable<Version[]>;
revertToVersion(projectId: number, versionId: number): Observable<boolean>;
}

// src/app/services/content-service.ts
export interface ContentService {getContent(projectId: number): Observable<string>;
updateContent(projectId: number, content: string): Observable<boolean>;
addInteractiveElement(projectId: number, element: InteractiveElement): Observable<InteractiveElement>;
removeInteractiveElement(projectId: number, elementId: number): Observable<boolean>;
}

// src/app/services/notification-service.ts
export interface NotificationService {sendNotification(userId: number, notification: Notification): Observable<boolean>;
// Add additional functions as needed below// ...// Example of a function that might be addedgetNotificationsForUser(userId: number): Observable<Notification[]>;
}

class definition
// src/app/services/project-service.ts
export interface ProjectService {getProjects(userId: number): Observable<Project[]>;
createProject(project: Project): Observable<Project>;
updateProject(project: Project): Observable<Project>;
deleteProject(projectId: number): Observable<boolean>;
getProjectById(projectId: number): Observable<Project>;
publishProject(projectId: number): Observable<boolean>;
// Additional methods based on the API listchangeProjectStatus(projectId: number, status: ProjectStatus): Observable<boolean>;
}

// src/app/services/search-service.ts
export interface SearchService {searchProjects(query: string, filters: Filter[]): Observable<Project[]>;
getSuggestedContent(userId: number): Observable<Content[]>;
}

class and
class has
// src/app/services/support-service.ts
export interface SupportService {getFAQs(): Observable<FAQ[]>;
submitFeedback(feedback: Feedback): Observable<boolean>;
}

// src/app/services/template-service.ts
export interface TemplateService {getTemplates(): Observable<Template[]>;
getTemplateById(templateId: number): Observable<Template>;
}

class as
// src/app/services/user-service.ts
export interface UserService {getUserById(userId: number): Observable<User>;
updateUser(user: User): Observable<User>;
getUserNotificationSettings(userId: number): Observable<NotificationSetting[]>;
updateUserNotificationSettings(userId: number, settings: NotificationSetting[]): Observable<boolean>;
}

```


## Directory structure sample

src/app/dialogs/sample-dialog.component/
src/app/pages/sample-page.component/
src/app/parts/sample-part.component/
src/app/services/sample.service.ts
src/app/models.ts



# SecurityComponent

## Detailed Screen Design Document
### Screen name
SecurityComponent

### Description
The SecurityComponent is a part of the User Settings/Profile Screen where users can manage their security settings. This includes changing their password and setting up two-factor authentication (2FA) for an additional layer of account security.

### Elements to be used
#### Angular elements
- SecurityComponent(@Input:{}, @Output:{})
  - This component does not directly receive any @Input or emit any @Output events, as it is a standalone component within the UserSettingsProfileComponent page.

#### Angular dialogs
- TwoFactorAuthDialog(MAT_DIALOG_DATA:{})
  - This dialog is used to guide the user through the setup of two-factor authentication. It may display a QR code for the user to scan with their authentication app and input fields for verifying the setup.

#### HTML components
- mat-form-field
  - Used for input fields where the user can enter their current password, new password, and confirm the new password.
  - Also used for input fields related to the setup and verification of two-factor authentication.

### Screen layout
The SecurityComponent is structured with two main sections:
1. **Password Change Section**: Contains input fields for the current password, new password, and confirmation of the new password, along with a submit button to apply the changes.
2. **Two-Factor Authentication Section**: Contains a description of what 2FA is, how it helps secure the account, and a button to initiate the 2FA setup process. Once initiated, the user is presented with a dialog containing further instructions and input fields for verification.

### Screen behavior
- When the user enters and submits a new password, the system validates the input and, if successful, updates the user's password.
- When the user opts to set up 2FA, the TwoFactorAuthDialog is opened, guiding them through the process. The system generates a secret key and QR code, which the user scans with their authentication app. The user then enters a code from the app to verify the setup.

### Input Form
- **Change Password Form**:
  - Current Password (required)
  - New Password (required, must meet security criteria)
  - Confirm New Password (required, must match New Password)
- **Two-Factor Authentication Form** (within dialog):
  - QR Code (displayed for scanning)
  - Verification Code (input by the user after scanning the QR Code)

### Error messages
- "Current password is incorrect."
- "New password does not meet security criteria."
- "New password and confirmation do not match."
- "Two-factor authentication setup failed. Please try again."
- "Verification code is incorrect or expired."

### Model classes used (excluding use from child components)
- User(id: number, name: string, email: string, role: UserRole, profilePictureUrl: string)
- TwoFactorAuthDetails(userId: number, secret: string, qrCodeUrl: string)

### Service classes and methods used (excluding calls from child components)
- AuthService:
  - changePassword(currentPassword: string, newPassword: string): Observable<boolean>
  - setupTwoFactorAuth(userId: number): Observable<TwoFactorAuthDetails>
  - verifyTwoFactorAuthCode(userId: number, code: string): Observable<boolean>


### @Input (as Angular element)


### @Output (as Angular element)


### MAT_DIALOG_DATA (as Angular dialog)

### To create the TypeScript component for the provided Angular template, we would need to define several variables, constants, ViewChild references, and functions. Below is a list of potential items that might be needed:

### Variables:
1. `currentPassword`, `string`, The model for the current password input field.
2. `newPassword`, `string`, The model for the new password input field.
3. `confirmNewPassword`, `string`, The model for the new password confirmation input field.

### Constants:
1. `PASSWORD_MIN_LENGTH`, `number`, The minimum length required for the new password.
2. `PASSWORD_REGEX`, `RegExp`, The regular expression pattern that the new password must match, including numeric and special characters.

### ViewChild:
1. `passwordForm`, `NgForm`, A reference to the password change form to access its properties and methods.

### Functions:
1. `openTwoFactorAuthDialog`, `(): void`, Opens the dialog for setting up two-factor authentication.
2. `changePassword`, `(): void`, Submits the password change form and handles the password update logic.

### Mat-Table Column Names (if applicable):
Since there is no `<mat-table>` in the provided HTML, there are no column names to list as constants. However, if there were a table, each column name would be listed here as a constant for reference in the TypeScript file.

Please note that the actual implementation may require additional variables, constants, ViewChild references, and functions depending on the specific requirements and functionalities of the SecurityComponent. The above list is based on the provided HTML and the typical needs for such a form.


## typescript template

```typescript
// src/app/parts/security.component.ts
import { Component, OnInit } from '@angular/core';
import { User, TwoFactorAuthDetails } from '../../models';
import { AuthService } from '../../services';

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html',
    styleUrls: ['./security.component.scss']
})
class  SecurityComponent implements OnInit {

    // The model for the current password input field.
    currentPassword: string;

    // The model for the new password input field.
    newPassword: string;

    // The model for the new password confirmation input field.
    confirmNewPassword: string;


    // The minimum length required for the new password.
    PASSWORD_MIN_LENGTH: number;

    // The regular expression pattern that the new password must match, including numeric and special characters.
    PASSWORD_REGEX: RegExp;




    // A reference to the password change form to access its properties and methods.
    @ViewChild('passwordForm') passwordForm: NgForm;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    /**
     * Opens the dialog for setting up two-factor authentication.
     */
    openTwoFactorAuthDialog(): () => void {
        // TODO implement
    }

    /**
     * Submits the password change form and handles the password update logic.
     */
    changePassword(): () => void {
        // TODO implement
    }

}
```



# prompt

Please carefully review the design information up to this point and add any missing features to COMPONENT.
Be sure to inspect the following points yourself before submitting.
- Please use AngularMaterial to create a polished design.
- Pay attention to the types and variable names (especially the difference between camel case and snake case).
- The argument and return type of the service class name must be correct.
- The @Input and @Output specifications are often forgotten. Please do not forget to check them.
- screen should be for Japanese.
- Replace all TODOs with implementation.
- Import statements and DI statements will be inspected.
Please write security.component.ts, as no explanation is needed.

