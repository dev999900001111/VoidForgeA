
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



# CollaborationComponent

## Detailed Screen Design Document

### Screen name
CollaborationComponent

### Description
The CollaborationComponent is a dedicated screen within the web application that allows users to manage collaboration settings, view and leave comments, and handle version control for a specific project. This component is designed to facilitate teamwork and ensure that multiple users can work together efficiently on the same project.

### Elements to be used

#### Angular elements
- CollaborationComponent(@Input:{project: Project}, @Output:{})

#### Angular dialogs
- SharingSettingsComponent(MAT_DIALOG_DATA:{})
- VersionControlComponent(MAT_DIALOG_DATA:{})

#### HTML components
- mat-tab-group

### Screen layout
The CollaborationComponent will be structured using a `mat-tab-group` to organize the different aspects of collaboration into tabs. The tabs will include "Sharing Settings", "Comments", and "Version Control". Each tab will correspond to a child component that handles the specific functionality:

1. **Sharing Settings Tab**: This tab will contain the `SharingSettingsComponent`, which allows the user to manage who has access to the project and what level of permissions they have.

2. **Comments Tab**: This tab will display the `CommentsSectionComponent`, where users can view all comments left by collaborators and add their own comments.

3. **Version Control Tab**: This tab will include the `VersionControlComponent`, which lists all the versions of the project and provides options to revert to a previous version if necessary.

### Screen behavior
Upon loading the CollaborationComponent, the user will be presented with the default open tab, which could be the "Sharing Settings" tab. The user can switch between tabs to access different collaboration features. Each tab will load its respective child component and display the relevant information for the project.

### Input Form
There is no direct input form on the CollaborationComponent itself, as input forms are part of the child components.

### Error messages
Error messages may be displayed in the following scenarios:
- Failure to load project collaboration details due to network or server issues.
- Errors in updating sharing settings, such as invalid permissions or unauthorized actions.
- Problems encountered when adding comments, such as submission errors or validation failures.
- Issues with version control operations, like errors during version reversion or retrieval of version history.

### Model classes used (excluding use from child components)
- Project(id: number, name: string, description: string, ownerId: number, templateId: number, content: string, status: ProjectStatus, collaborators: User[], createdAt: Date, updatedAt: Date)

### Service classes and methods used (excluding calls from child components)
- CollaborationService: 
  - getCollaborators(projectId: number): Observable<User[]>
  - addCollaborator(projectId: number, userId: number): Observable<boolean>
  - removeCollaborator(projectId: number, userId: number): Observable<boolean>
  - getComments(projectId: number): Observable<Comment[]>
  - addComment(projectId: number, content: string): Observable<Comment>
  - getProjectVersions(projectId: number): Observable<Version[]>
  - revertToVersion(projectId: number, versionId: number): Observable<boolean>

The CollaborationComponent will utilize the `CollaborationService` to fetch and manage collaboration-related data. It will not directly call the service methods for adding comments or reverting versions, as these actions are handled by the child components. However, it will use the service to retrieve the initial data required to populate the child components, such as the list of collaborators, comments, and project versions.


### @Input (as Angular element)

- project: Project


### @Output (as Angular element)


### MAT_DIALOG_DATA (as Angular dialog)

### To create the TypeScript component class (`CollaborationComponent.ts`) that works with the provided Angular template, we would need to define the following:

### Variables
1. `project`, type: `Project`, description: An object containing the project data that is passed as an input to the `SharingSettingsComponent`.

### Constants
### 1. There are no explicit constants defined in the HTML snippet provided. However, if the column names for a `mat-table` are needed (not shown in the HTML), they would typically be defined as an array of strings in the TypeScript file. For example:
   - `displayedColumns`, type: `string[]`, description: An array of strings representing the column names for a `mat-table`.

### ViewChild
### 1. There are no `ViewChild` references indicated in the HTML snippet provided. However, if you need to interact with the `mat-tab-group` or any of the tabs directly from the TypeScript code, you might use `ViewChild`. For example:
   - `tabGroup`, type: `MatTabGroup`, description: A reference to the `MatTabGroup` to interact with the tabs programmatically.

### Functions
### 1. There are no functions explicitly required by the HTML snippet provided. However, you might have functions to handle events or to perform actions when a tab is changed. For example:
   - `onTabChange`, type: `function(event: MatTabChangeEvent): void`, description: A function that is called when a new tab is selected.

### Additional Notes
- The `project` variable would need to be populated from a parent component or fetched from a service.
- If the `mat-tab-group` requires interaction, such as selecting a specific tab programmatically, additional functions and `ViewChild` references would be necessary.
- If the `mat-table` is part of the child components (`app-sharing-settings`, `app-comments-section`, or `app-version-control`), then the `displayedColumns` constant would be defined within those child components, not in the `CollaborationComponent`.
- The `projectId` is assumed to be a property of the `project` object, hence why it is accessed as `project.id`. If this is not the case, a separate `projectId` variable would need to be defined.

Please note that the actual implementation may require additional variables, constants, `ViewChild` references, and functions depending on the specific logic and requirements of the `CollaborationComponent` and its child components.


## typescript template

```typescript
// src/app/pages/collaboration.component.ts
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models';
import { CollaborationService } from '../../services';

@Component({
    selector: 'app-collaboration',
    templateUrl: './collaboration.component.html',
    styleUrls: ['./collaboration.component.scss']
})
class  CollaborationComponent implements OnInit {

    // An object containing the project data that is passed as an input to the SharingSettingsComponent.
    project: Project;


    // An array of strings representing the column names for a mat-table.
    displayedColumns: string[];


    @Input() project: Project;


    // A reference to the MatTabGroup to interact with the tabs programmatically.
    @ViewChild('tabGroup') tabGroup: MatTabGroup;

    constructor(private collaborationService: CollaborationService) {
    }

    ngOnInit(): void {
    }

    /**
     * A function that is called when a new tab is selected.
     */
    onTabChange(): function(event: MatTabChangeEvent): void {
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
Please write collaboration.component.ts, as no explanation is needed.

