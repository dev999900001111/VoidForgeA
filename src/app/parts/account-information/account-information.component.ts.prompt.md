
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



# AccountInformationComponent

## Detailed Screen Design Document

### Screen name
AccountInformationComponent

### Description
The AccountInformationComponent is a part of the User Settings/Profile Screen where users can view and edit their personal account information such as name, email, and profile picture. This component is designed to allow users to manage their account details and ensure their personal information is up-to-date.

### Elements to be used

#### Angular elements
- UserSettingsProfileComponent(@Input:{user: User}, @Output:{update: EventEmitter<any>})

#### Angular dialogs
- None specific to AccountInformationComponent

#### HTML components
- mat-form-field

### Screen layout
The AccountInformationComponent will be structured as a form within a mat-card container. It will include the following fields, each using the mat-form-field component:
- Full Name (text input)
- Email Address (email input)
- Profile Picture (file input with preview)

The form will also include a 'Save Changes' button at the bottom, which will be used to submit the form and update the user's account information.

### Screen behavior
When the user enters the User Settings/Profile Screen and selects the Account Information tab, the AccountInformationComponent will be displayed. The component will be pre-filled with the current user's information. The user can edit their name, email, and profile picture. Upon clicking the 'Save Changes' button, the component will validate the input and then emit an update event to the parent component (UserSettingsProfileComponent) to handle the update process.

### Input Form
The input form will consist of the following fields:
- Full Name: Required text input field for the user's full name.
- Email Address: Required email input field for the user's email address.
- Profile Picture: Optional file input for the user's profile picture with a preview of the current picture.

### Error messages
The following error messages will be displayed under the respective form fields if the user tries to submit the form with invalid data:
- Full Name: "Please enter your full name."
- Email Address: "Please enter a valid email address."
- Profile Picture: "Please upload a valid image file."

### Model classes used (excluding use from child components)
- User(id: number, name: string, email: string, role: UserRole, profilePictureUrl: string)

### Service classes and methods used (excluding calls from child components)
- UserService: updateUser(user: User): Observable<User>

The updateUser method from the UserService will be used to send the updated user information to the server. The method takes a User object as a parameter and returns an Observable that emits the updated User object upon successful update. If the update fails, it will emit an error which should be handled to display an appropriate message to the user.


### @Input (as Angular element)

- user: User


### @Output (as Angular element)

- update: EventEmitter<any>


### MAT_DIALOG_DATA (as Angular dialog)

### Below is a list of the required variables, constants, ViewChild, and functions that would be needed in the TypeScript file to support the provided Angular template:

### Variables:
1. `user`: `any` - An object to hold the user's information such as name, email, and profilePictureUrl.

### Constants:
1. `MAT_TABLE_COLUMN_NAMES`: `string[]` - An array of strings representing the column names for a `mat-table` if it were to be used. Since the provided HTML does not include a `mat-table`, this is hypothetical.

### ViewChild:
1. `profilePictureInput`: `ElementRef` - A reference to the file input element for the profile picture. It is used to access the file input and its properties in the TypeScript code.

### Functions:
1. `onSubmit(form: NgForm)`: `void` - A function that is called when the form is submitted. It should take the form of type `NgForm` as a parameter and handle the form submission logic.
2. `onProfilePictureChange(event: Event)`: `void` - A function that is triggered when the profile picture file input changes. It should take the event of type `Event` as a parameter and handle the logic for updating the user's profile picture.

### Additional Notes:
- The `user` variable should be initialized with the necessary properties that are bound to the form inputs, such as `name`, `email`, and `profilePictureUrl`.
- The `MAT_TABLE_COLUMN_NAMES` constant is not directly related to the provided HTML but is mentioned in the prompt. If a `mat-table` were to be used, this constant would define the columns to be displayed.
- The `ViewChild` for `profilePictureInput` should be decorated with `@ViewChild` in the TypeScript file to establish the connection between the template and the class property.
- The `onSubmit` and `onProfilePictureChange` functions should be properly implemented to handle their respective events. The `onSubmit` function would typically process the form data and possibly send it to a backend service. The `onProfilePictureChange` function would handle the file input change, potentially reading the file and updating the `user.profilePictureUrl` to reflect the new picture.
- Error handling and form validation logic should be included within these functions to ensure robust and user-friendly behavior.
- The TypeScript file should also include necessary imports such as `NgForm` from `@angular/forms`, `ElementRef` from `@angular/core`, and any other relevant Angular Material components or directives used in the template.


## typescript template

```typescript
// src/app/parts/account-information.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { UserService } from '../../services';

@Component({
    selector: 'app-account-information',
    templateUrl: './account-information.component.html',
    styleUrls: ['./account-information.component.scss']
})
class  AccountInformationComponent implements OnInit {

    // An object to hold the user's information such as name, email, and profilePictureUrl.
    user: any;


    // An array of strings representing the column names for a mat-table if it were to be used.
    MAT_TABLE_COLUMN_NAMES: string[];


    @Input() user: User;
    @Output() update: EventEmitter<any>;


    // A reference to the file input element for the profile picture.
    @ViewChild('profilePictureInput') profilePictureInput: ElementRef;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
    }

    /**
     * A function that is called when the form is submitted.
     */
    onSubmit(form: NgForm): void {
        // TODO implement
    }

    /**
     * A function that is triggered when the profile picture file input changes.
     */
    onProfilePictureChange(event: Event): void {
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
Please write account-information.component.ts, as no explanation is needed.

