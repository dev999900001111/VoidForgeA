
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



# DashboardComponent

## Detailed Screen Design Document

### Screen name
DashboardComponent

### Description
The DashboardComponent serves as the central hub for users to manage their projects. It displays a list of existing projects and provides the ability to create new ones. The dashboard is the first screen a user sees after logging in, and it is designed to give a quick overview of their work and easy access to all functionalities related to project management.

### Elements to be used

#### Angular elements
- AppComponent(@Input:{}, @Output:{})
- HeaderComponent(@Input:{user: User}, @Output:{logout: EventEmitter<any>})
- FooterComponent(@Input:{}, @Output:{})
- DashboardComponent(@Input:{projects: Project[]}, @Output:{select: EventEmitter<any>})
- ProjectCreationEditComponent(@Input:{project: Project}, @Output:{save: EventEmitter<any>})
- CollaborationComponent(@Input:{project: Project}, @Output:{})
- UserSettingsProfileComponent(@Input:{user: User}, @Output:{update: EventEmitter<any>})
- HelpSupportComponent(@Input:{faqs: FAQ[]}, @Output:{})
- SearchExplorationComponent(@Input:{}, @Output:{})

#### Angular dialogs
- ConfirmationDialog(MAT_DIALOG_DATA:{message: string}, @Output:{confirm: EventEmitter<any>})

#### HTML components
- mat-grid-list

### Screen layout
The DashboardComponent will be structured as follows:
- A header at the top of the page, containing the HeaderComponent with user information and logout functionality.
- A main content area displaying the user's projects in a grid list format, with each project represented as a card within the mat-grid-list.
- Each project card will have options to edit, share, or delete the project, which will invoke the ConfirmationDialog when deletion is selected.
- A floating action button (FAB) positioned at the bottom right of the screen, allowing users to create a new project.
- A footer at the bottom of the page, containing the FooterComponent with additional links and information.

### Screen behavior
- Upon loading, the DashboardComponent will display all the user's projects.
- Clicking on a project card will emit a select event and navigate the user to the ProjectCreationEditComponent for editing.
- Clicking the FAB will navigate the user to the ProjectCreationEditComponent with a new project context.
- Selecting the delete option on a project card will open the ConfirmationDialog to confirm the action before deletion.
- The HeaderComponent will display the user's profile picture and name, and provide a logout button that, when clicked, will emit a logout event.

### Input Form
There is no direct input form on the DashboardComponent itself, as it primarily serves as a display and navigation interface.

### Error messages
Error messages may be displayed in the following scenarios:
- Failure to load the user's projects due to a server or network error.
- Failure to delete a project due to a server or network error.

### Model classes used (excluding use from child components)
- Project(id: number, name: string, description: string, ownerId: number, templateId: number, content: string, status: ProjectStatus, collaborators: User[], createdAt: Date, updatedAt: Date)

### Service classes and methods used (excluding calls from child components)
- ProjectService: getProjects(userId: number): Observable<Project[]>
- ProjectService: deleteProject(projectId: number): Observable<boolean>


### @Input (as Angular element)

- projects: Project[]


### @Output (as Angular element)

- select: EventEmitter<any>


### MAT_DIALOG_DATA (as Angular dialog)

Below is a list of the required variables, constants, ViewChild, and functions that would be needed in the TypeScript file to support the provided Angular template. Note that the actual implementation details and types are assumed based on the context provided by the HTML template.

### Variables:
1. `user`, Type: `User`, Description: An object representing the current user, to be passed to the `app-header` component.
2. `projects`, Type: `Project[]`, Description: An array of project objects to be displayed in the grid list.

### Constants:
1. `COLUMN_NAMES`, Type: `string[]`, Description: An array of strings representing the column names for the `mat-table`, if applicable. (Note: The provided HTML does not include a `mat-table`, so this constant is not directly relevant to the given code.)

### ViewChild:
(None specified in the provided HTML, but if there were elements that needed direct access, they would be listed here.)

### Functions:
1. `onLogout`, Type: `Function`, Description: A method to handle the logout event emitted by the `app-header`.
2. `openConfirmationDialog`, Type: `Function`, Parameters: `projectId: string`, Description: A method to open a confirmation dialog when the user attempts to delete a project.
3. `navigateToProjectCreation`, Type: `Function`, Description: A method to navigate the user to the `ProjectCreationEditComponent` for creating a new project.
4. `select.emit`, Type: `Function`, Parameters: `project: Project`, Description: An EventEmitter method that emits the selected project when the edit button is clicked.

### Additional Notes:
- The `select` variable would be an `EventEmitter<Project>` instance if it is intended to emit the selected project to a parent component.
- The `Project` type mentioned in the variables and functions would be an interface or class representing the project data structure, which should include at least `name`, `description`, `thumbnailUrl`, and `updatedAt` properties.
- The `User` type mentioned in the variables would be an interface or class representing the user data structure.
- The actual implementation of the `ConfirmationDialog` and how it is opened would require additional code not specified in the HTML, such as a dialog service or component.
- The `navigateToProjectCreation` function would likely use Angular's `Router` service to navigate to the appropriate route.
- The `mat-icon` and `mat-fab` indicate that Material Icons should be included in the project dependencies.
- The `date` pipe used in the template suggests that the `DatePipe` from `@angular/common` should be imported and provided if custom date formatting is required in the TypeScript code.


## typescript template

```typescript
// src/app/pages/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models';
import { ProjectService } from '../../services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
class  DashboardComponent implements OnInit {

    // An object representing the current user, to be passed to the app-header component.
    user: User;

    // An array of project objects to be displayed in the grid list.
    projects: Project[];


    // An array of strings representing the column names for the mat-table, if applicable.
    COLUMN_NAMES: string[];


    @Input() projects: Project[];
    @Output() select: EventEmitter<any>;




    constructor(private projectService: ProjectService) {
    }

    ngOnInit(): void {
    }

    /**
     * A method to handle the logout event emitted by the app-header.
     */
    onLogout(): Function {
        // TODO implement
    }

    /**
     * A method to open a confirmation dialog when the user attempts to delete a project.
     */
    openConfirmationDialog(): Function {
        // TODO implement
    }

    /**
     * A method to navigate the user to the ProjectCreationEditComponent for creating a new project.
     */
    navigateToProjectCreation(): Function {
        // TODO implement
    }

    /**
     * An EventEmitter method that emits the selected project when the edit button is clicked.
     */
    select.emit(): Function {
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
Please write dashboard.component.ts, as no explanation is needed.

