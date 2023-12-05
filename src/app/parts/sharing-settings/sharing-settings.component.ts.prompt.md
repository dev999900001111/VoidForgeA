
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



# SharingSettingsComponent

## Detailed Screen Design Document

### Screen name
SharingSettingsComponent

### Description
The SharingSettingsComponent is a part of the CollaborationComponent. It allows users to manage the sharing settings of their projects, including setting permissions for collaborators. Users can toggle the sharing settings to control who can view or edit the project.

### Elements to be used

#### Angular elements
- SharingSettingsComponent(@Input:{permissions: Permission[]}, @Output:{update: EventEmitter<Permission[]>})

#### Angular dialogs
- ShareSettingsDialog(MAT_DIALOG_DATA:{settings: Permission[]}, @Output:{update: EventEmitter<Permission[]>})

#### HTML components
- mat-slide-toggle

### Screen layout
The SharingSettingsComponent will be displayed as a section within the CollaborationComponent. It will consist of a list of current collaborators with their respective permissions. Each collaborator will have a corresponding mat-slide-toggle to enable or disable their editing permissions.

### Screen behavior
When the user toggles the mat-slide-toggle for a collaborator, the change will be reflected immediately in the UI. The user can then save these changes, which will emit an update event with the new permissions array to the parent CollaborationComponent.

### Input Form
There is no explicit form for input; however, the mat-slide-toggle acts as an input for changing permission settings.

### Error messages
- "Failed to update sharing settings. Please try again later." - This message will be displayed if there is an error while updating the permissions.

### Model classes used (excluding use from child components)
- Permission(userId: number, projectId: number, permissionLevel: PermissionLevel)

### Service classes and methods used (excluding calls from child components)
- CollaborationService: 
  - addCollaborator(projectId: number, userId: number): Observable<boolean>
  - removeCollaborator(projectId: number, userId: number): Observable<boolean>
  - updateCollaboratorPermissions(projectId: number, userId: number, permissionLevel: PermissionLevel): Observable<boolean>


### @Input (as Angular element)

- permissions: Permission[]


### @Output (as Angular element)

- update: EventEmitter<any>


### MAT_DIALOG_DATA (as Angular dialog)

### Based on the provided HTML snippet, here is a list of the variables, constants, ViewChild, and functions that would be needed in the corresponding TypeScript component file to make this template functional:

### Variables:
- `permissions`: `Permission[]`, An array of permission objects that contains the user ID and permission level for each collaborator.
- `update`: `EventEmitter<{userId: string, permissionLevel: string}>`, An event emitter that emits an event when the permission level for a user is changed.

### Constants:
- There are no explicit constants defined in the HTML snippet provided. However, if we consider the mat-table's column names as constants, they would be:
  - `USER_COLUMN`: `string`, The name of the column displaying the user's name.
  - `PERMISSION_COLUMN`: `string`, The name of the column displaying the permission level.
  - `TOGGLE_COLUMN`: `string`, The name of the column containing the slide toggle for editing permissions.

### ViewChild:
- There are no `ViewChild` references indicated in the HTML snippet provided. However, if there were elements that needed direct access within the component, they would be listed here with their respective types and descriptions.

### Functions:
- `userName`: `PipeTransform`, A custom pipe function that takes a user ID and returns the corresponding user name.
- `permissionLevel`: `PipeTransform`, A custom pipe function that takes a permission level value and returns a human-readable permission level string.

### Additional Assumptions:
- The `Permission` model is assumed to be an interface or class with at least the following properties:
  - `userId`: `string`, The unique identifier for a user.
  - `permissionLevel`: `string`, The permission level assigned to the user, such as 'EDITOR' or 'VIEWER'.

### Example TypeScript Component Class:
```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PipeTransform } from '@angular/core';

interface Permission {
  userId: string;
  permissionLevel: string;
}

@Component({
  selector: 'app-sharing-settings',
  templateUrl: './sharing-settings.component.html',
  styleUrls: ['./sharing-settings.component.css']
})
export class SharingSettingsComponent {
  @Input() permissions: Permission[];
  @Output() update = new EventEmitter<{userId: string, permissionLevel: string}>();

  // Assuming userName and permissionLevel are implemented elsewhere as pipes
  // and are just used here for the sake of completeness.
  userName: PipeTransform; // Placeholder for the actual pipe implementation
  permissionLevel: PipeTransform; // Placeholder for the actual pipe implementation

  // Constants for mat-table's column names (if applicable)
  readonly USER_COLUMN: string = 'User';
  readonly PERMISSION_COLUMN: string = 'Permission';
  readonly TOGGLE_COLUMN: string = 'Toggle';

  // Function to emit the update event when the permission level is changed
  onPermissionChange(userId: string, isChecked: boolean): void {
    const permissionLevel = isChecked ? 'EDITOR' : 'VIEWER';
    this.update.emit({userId, permissionLevel});
  }
}
```

Note: The actual implementation of the `userName` and `permissionLevel` pipes is not provided here, as they are placeholders for custom pipe implementations that would need to be defined elsewhere in the application.


## typescript template

```typescript
// src/app/parts/sharing-settings.component.ts
import { Component, OnInit } from '@angular/core';
import { Permission } from '../../models';
import { CollaborationService } from '../../services';

@Component({
    selector: 'app-sharing-settings',
    templateUrl: './sharing-settings.component.html',
    styleUrls: ['./sharing-settings.component.scss']
})
class  SharingSettingsComponent implements OnInit {

    // An array of permission objects that contains the user ID and permission level for each collaborator.
    permissions: Permission[];


    // The name of the column displaying the user's name.
    USER_COLUMN: string;

    // The name of the column displaying the permission level.
    PERMISSION_COLUMN: string;

    // The name of the column containing the slide toggle for editing permissions.
    TOGGLE_COLUMN: string;


    @Input() permissions: Permission[];
    @Output() update: EventEmitter<any>;




    constructor(private collaborationService: CollaborationService) {
    }

    ngOnInit(): void {
    }

    /**
     * A custom pipe function that takes a user ID and returns the corresponding user name.
     */
    userName(): PipeTransform {
        // TODO implement
    }

    /**
     * A custom pipe function that takes a permission level value and returns a human-readable permission level string.
     */
    permissionLevel(): PipeTransform {
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
Please write sharing-settings.component.ts, as no explanation is needed.

