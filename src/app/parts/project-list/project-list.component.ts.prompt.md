
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



# ProjectListComponent

## Detailed Screen Design Document

### Screen name
ProjectListComponent

### Description
The ProjectListComponent is a part of the DashboardComponent that displays a list of the user's projects. It allows users to manage their projects by providing functionality to edit or delete them. This component is designed to give a quick overview of each project and enable easy navigation to project-specific actions.

### Elements to be used

#### Angular elements
- DashboardComponent(@Input:{projects: Project[]}, @Output:{select: EventEmitter<any>})

#### Angular dialogs
- ConfirmationDialog(MAT_DIALOG_DATA:{message: string}, @Output:{confirm: EventEmitter<any>})

#### HTML components
- mat-list

### Screen layout
The ProjectListComponent will be displayed as a list within the DashboardComponent. Each list item will represent a project and will include the project's name, description, and thumbnail (if available). Next to each project, there will be action buttons for editing and deleting the project.

### Screen behavior
- **Project Selection**: When a user clicks on a project name or thumbnail, the DashboardComponent will emit a `select` event to navigate the user to the ProjectCreationEditComponent for editing the project.
- **Delete Action**: When the delete button is clicked, a ConfirmationDialog will be displayed to confirm the deletion. If confirmed, the ProjectListComponent will emit a `delete` event to remove the project from the list.

### Input Form
There is no input form directly within the ProjectListComponent as it is primarily for display and interaction with existing projects.

### Error messages
- **Deletion Error**: If there is an error during the deletion process, an appropriate error message will be displayed to the user, such as "Unable to delete the project. Please try again later."

### Model classes used (excluding use from child components)
- Project(id: number, name: string, description: string, ownerId: number, templateId: number, content: string, status: ProjectStatus, collaborators: User[], createdAt: Date, updatedAt: Date)

### Service classes and methods used (excluding calls from child components)
- ProjectService: deleteProject(id: number): Observable<boolean>


### @Input (as Angular element)

- projects: Project[]


### @Output (as Angular element)

- delete: EventEmitter<any>


### MAT_DIALOG_DATA (as Angular dialog)

### Here's a list of the potential variables, constants, ViewChild, and functions that might be needed in the TypeScript component to support the provided Angular template:

### Variables:
- `projects`, `Array<{id: string, name: string, description: string, thumbnail?: string}>`, An array of project objects that contains the id, name, description, and an optional thumbnail property for each project.

### Constants:
- There are no explicit constants in the provided HTML, but if we consider the mat-table's column names as constants, they might be something like:
  - `COLUMN_NAMES`, `string[]`, An array of strings representing the column names for a mat-table, which could include 'thumbnail', 'name', 'description', 'edit', and 'delete'.

### ViewChild:
- There are no ViewChild decorators used in the provided HTML snippet. However, if there were elements in the template that needed to be accessed directly in the TypeScript code, they would be listed here with the ViewChild decorator.

### Functions:
- `select.emit`, `(project: any) => void`, A function that emits an event when the edit button is clicked, passing the selected project as an argument.
- `delete.emit`, `(projectId: string) => void`, A function that emits an event when the delete button is clicked, passing the project's id as an argument.

Please note that the actual implementation details such as the types for the `project` object or the exact signature of the `select.emit` and `delete.emit` functions may vary based on the broader application context. The above descriptions are based on the provided HTML snippet and common Angular patterns.


## typescript template

```typescript
// src/app/parts/project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models';
import { ProjectService } from '../../services';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
class  ProjectListComponent implements OnInit {

    // An array of project objects that contains the id, name, description, and an optional thumbnail property for each project.
    projects: Array<{id: string, name: string, description: string, thumbnail?: string}>;


    // An array of strings representing the column names for a mat-table, which could include 'thumbnail', 'name', 'description', 'edit', and 'delete'.
    COLUMN_NAMES: string[];


    @Input() projects: Project[];
    @Output() delete: EventEmitter<any>;




    constructor(private projectService: ProjectService) {
    }

    ngOnInit(): void {
    }

    /**
     * A function that emits an event when the edit button is clicked, passing the selected project as an argument.
     */
    select.emit(): (project: any) => void {
        // TODO implement
    }

    /**
     * A function that emits an event when the delete button is clicked, passing the project's id as an argument.
     */
    delete.emit(): (projectId: string) => void {
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
Please write project-list.component.ts, as no explanation is needed.

