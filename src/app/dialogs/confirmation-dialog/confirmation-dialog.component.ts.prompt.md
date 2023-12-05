
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



# ConfirmationDialog

## Detailed Screen Design Document
### Screen name
ConfirmationDialog

### Description
The ConfirmationDialog is a reusable dialog component that presents a confirmation message to the user and captures their response. It is used throughout the application to confirm user actions such as deleting a project, reverting to a previous version of a project, or changing sharing settings. The dialog provides a simple interface with a message and two buttons for the user to either confirm or cancel the action.

### Elements to be used
#### Angular elements
- ConfirmationDialog(@Input:{message: string}, @Output:{confirm: EventEmitter<any>})

#### Angular dialogs
- ConfirmationDialog(MAT_DIALOG_DATA:{message: string})

#### HTML components
- mat-dialog-content
- mat-dialog-actions
- button (for confirm and cancel actions)

### Screen layout
The ConfirmationDialog should be centered on the screen and contain the following elements:
1. A `mat-dialog-content` element that displays the confirmation message passed through `MAT_DIALOG_DATA`.
2. A `mat-dialog-actions` element that contains two buttons:
   - A "Confirm" button that, when clicked, emits an event through the `confirm` output event emitter to indicate that the user has confirmed the action.
   - A "Cancel" button that, when clicked, closes the dialog without emitting the `confirm` event, indicating that the user has canceled the action.

### Screen behavior
- When the dialog is opened, it should display the confirmation message to the user.
- The "Confirm" button should be styled to indicate a primary action, while the "Cancel" button should be styled as a secondary action.
- Clicking the "Confirm" button should emit an event to the parent component and close the dialog.
- Clicking the "Cancel" button should close the dialog without taking any further action.

### Input Form
There is no input form in the ConfirmationDialog as it is only used to display a message and capture a confirmation response.

### Error messages
There are no error messages associated with the ConfirmationDialog as it does not handle any user input other than the confirmation or cancellation of an action.

### Model classes used (excluding use from child components)
No model classes are directly used by the ConfirmationDialog component.

### Service classes and methods used (excluding calls from child components)
No service classes or methods are directly used by the ConfirmationDialog component. However, the parent component that invokes the ConfirmationDialog may use service methods to handle the confirmation action, such as `ProjectService.deleteProject()` or `CollaborationService.revertToVersion()`, depending on the context in which the dialog is used.


### @Input (as Angular element)

- message: string


### @Output (as Angular element)

- confirm: EventEmitter<any>


### MAT_DIALOG_DATA (as Angular dialog)

Based on the provided Angular template snippet, here are the potential variables, constants, ViewChild, and functions that might be needed in the corresponding TypeScript file to make this template functional. Note that some assumptions are made due to the lack of context.

### Variables:
1. `message`: string - This variable holds the message text to be displayed within the `<mat-dialog-content>`.

### Constants:
1. `CANCEL_LABEL`: string - This constant represents the translation key for the 'キャンセル' text, which is used for the cancel button label.
2. `CONFIRM_LABEL`: string - This constant represents the translation key for the '確認' text, which is used for the confirm button label.

### ViewChild:
No `ViewChild` is evident from the provided template. `ViewChild` is used to access a child component, directive, or DOM element from the parent component class, and there is no indication of such usage in the snippet.

### Functions:
1. `confirm.emit()`: function - This function is likely an EventEmitter method that emits an event when the confirm button is clicked. The actual function name might differ, and `confirm` is likely an `EventEmitter` instance defined in the component class.

### Additional Notes:
- The `translate` pipe is used for internationalization, which suggests that there is a translation service being used. The actual service or mechanism is not shown in the snippet.
- The `mat-dialog-close` directive on the cancel button suggests that clicking the button will close the dialog. There is no additional function needed in the TypeScript file for this unless custom behavior is required on close.
- The `color="primary"` attribute on the confirm button suggests that there is a theme or styling convention being used, which is defined elsewhere in the application's styles or theme configuration.

### Example TypeScript (assuming the above):
```typescript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  // Variables
  message: string;

  // Constants (these could also be defined in a separate constants file or localization file)
  readonly CANCEL_LABEL: string = 'キャンセル';
  readonly CONFIRM_LABEL: string = '確認';

  // EventEmitter for confirm action
  @Output() confirm = new EventEmitter<void>();

  constructor() {
    // Initialization of variables if needed
    this.message = 'Your message here';
  }

  // Function to emit the confirm event
  onConfirm(): void {
    this.confirm.emit();
  }
}
```

In this example, the `onConfirm` function is created to wrap the `confirm.emit()` call, which is a common practice to encapsulate component logic within methods rather than directly in the template. The actual implementation may vary based on the specific requirements of the application.


## typescript template

```typescript
// src/app/dialogs/confirmation-dialog.component.ts
import { Component, OnInit } from '@angular/core';
import {  } from '../../models';
import {  } from '../../services';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
class  ConfirmationDialogComponent implements OnInit {

    // This variable holds the message text to be displayed within the <mat-dialog-content>.
    message: string;


    // This constant represents the translation key for the 'キャンセル' text, which is used for the cancel button label.
    CANCEL_LABEL: string;

    // This constant represents the translation key for the '確認' text, which is used for the confirm button label.
    CONFIRM_LABEL: string;


    @Input() message: string;
    @Output() confirm: EventEmitter<any>;




    constructor() {
    }

    ngOnInit(): void {
    }

    /**
     * This function is likely an EventEmitter method that emits an event when the confirm button is clicked.
     */
    confirm.emit(): function {
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
Please write confirmation-dialog.component.ts, as no explanation is needed.

