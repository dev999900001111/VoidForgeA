
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



# ProjectCreationEditComponent

## Detailed Screen Design Document

### Screen name
ProjectCreationEditComponent

### Description
The ProjectCreationEditComponent is a crucial interface within the web application that allows users to create new projects or edit existing ones. It provides a rich content editor for users to input and format text, add images, videos, and interactive elements like quizzes. The component also includes functionality to save or publish the project.

### Elements to be used

#### Angular elements
- AppComponent(@Input:{}, @Output:{})
- HeaderComponent(@Input:{user: User}, @Output:{logout: EventEmitter<any>})
- FooterComponent(@Input:{}, @Output:{})
- ProjectCreationEditComponent(@Input:{project: Project}, @Output:{save: EventEmitter<any>})

#### Angular dialogs
- SavePublishDialog(@Input:{}, @Output:{save: EventEmitter<any>, publish: EventEmitter<any>})

#### HTML components
- mat-card

### Screen layout
The screen layout for the ProjectCreationEditComponent will consist of a main editing area encapsulated within a `mat-card` component. This card will contain the content editor and options for saving or publishing the project. The layout will be clean and minimalistic to avoid distractions and focus the user on the content creation process.

### Screen behavior
Upon loading the ProjectCreationEditComponent, if a project ID is present in the URL, the component will load the existing project data into the content editor for editing. If no project ID is present, it will initialize a new project template.

The component will have a 'Save' button that triggers the save event, emitting the current state of the project to be saved. There will also be a 'Publish' button that opens the SavePublishDialog, allowing the user to confirm publishing the project.

Changes made in the content editor will be auto-saved at regular intervals to prevent data loss.

### Input Form
The input form within the ProjectCreationEditComponent will be the content editor itself, which allows for rich text formatting and the ability to embed multimedia and interactive elements. The form will handle input such as text, images, videos, and other supported content types.

### Error messages
Error messages may be displayed in the following scenarios:
- Failure to save the project due to network issues or server errors.
- Failure to publish the project due to incomplete required fields or server errors.
- Invalid input or unsupported file types when adding multimedia content.

These error messages will be user-friendly and guide the user on how to resolve the issue.

### Model classes used (excluding use from child components)
- Project(id: number, name: string, description: string, ownerId: number, templateId: number, content: string, status: ProjectStatus, collaborators: User[], createdAt: Date, updatedAt: Date)

### Service classes and methods used (excluding calls from child components)
- ProjectService: 
  - createProject(project: Project): Observable<Project>
  - updateProject(project: Project): Observable<Project>
  - publishProject(projectId: number): Observable<boolean>

The ProjectService will be used to handle the creation, updating, and publishing of projects. When the user decides to save the project, the `updateProject` method will be called with the current project data. If the user chooses to publish the project, the `publishProject` method will be invoked after confirmation from the SavePublishDialog.


### @Input (as Angular element)

- project: Project


### @Output (as Angular element)

- save: EventEmitter<any>


### MAT_DIALOG_DATA (as Angular dialog)

Based on the provided Angular template, here is a list of the variables, constants, ViewChild, and functions that would be needed in the corresponding TypeScript component file. Please note that the actual implementation details such as the types of the variables and the logic within the functions would depend on the broader context of the application.

### Variables:
1. `project`, type: `Project | undefined`, description: An object that holds the details of the project. It may be undefined if a new project is being created.
2. `save`, type: `EventEmitter<Project>`, description: An Angular `@Output` event emitter that emits the project object when the save button is clicked.

### Constants:
1. `PROJECT_CREATION_TITLE`, type: `string`, description: A constant for the title displayed when creating a new project, which would be `'新しいプロジェクト'`.
2. `PROJECT_EDIT_TITLE`, type: `string`, description: A constant for the title displayed when editing an existing project, which would be `'プロジェクトを編集'`.

### ViewChild:
1. `savePublishDialog`, type: `TemplateRef<any>`, description: A reference to the `ng-template` that contains the `SavePublishDialog` component.

### Functions:
1. `openSavePublishDialog`, return type: `void`, description: A function that opens the save/publish dialog when the publish button is clicked.
2. `publishProject`, return type: `void`, description: A function that handles the logic for publishing the project when the publish option is selected from the dialog.

### Mat-Table Column Names (Constants):
Since there is no `mat-table` in the provided HTML snippet, I cannot provide the column names. However, if there were a `mat-table`, each column name would be a constant, typically a string that identifies the column in the table configuration.

### For example, if there were a table for displaying project details, you might have:
1. `COLUMN_PROJECT_NAME`, type: `string`, description: The column name for the project name.
2. `COLUMN_PROJECT_DESCRIPTION`, type: `string`, description: The column name for the project description.

Please note that the actual names and types of the constants for the column names would depend on the specific fields you want to display in your `mat-table`.


## typescript template

```typescript
// src/app/pages/project-creation-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models';
import { ProjectService } from '../../services';

@Component({
    selector: 'app-project-creation-edit',
    templateUrl: './project-creation-edit.component.html',
    styleUrls: ['./project-creation-edit.component.scss']
})
class  ProjectCreationEditComponent implements OnInit {

    // An object that holds the details of the project. It may be undefined if a new project is being created.
    project: Project | undefined;

    // An Angular @Output event emitter that emits the project object when the save button is clicked.
    save: EventEmitter<Project>;


    // A constant for the title displayed when creating a new project, which would be '新しいプロジェクト'.
    PROJECT_CREATION_TITLE: string;

    // A constant for the title displayed when editing an existing project, which would be 'プロジェクトを編集'.
    PROJECT_EDIT_TITLE: string;


    @Input() project: Project;
    @Output() save: EventEmitter<any>;


    // A reference to the ng-template that contains the SavePublishDialog component.
    @ViewChild('savePublishDialog') savePublishDialog: TemplateRef<any>;

    constructor(private projectService: ProjectService) {
    }

    ngOnInit(): void {
    }

    /**
     * A function that opens the save/publish dialog when the publish button is clicked.
     */
    openSavePublishDialog(): void {
        // TODO implement
    }

    /**
     * A function that handles the logic for publishing the project when the publish option is selected from the dialog.
     */
    publishProject(): void {
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
Please write project-creation-edit.component.ts, as no explanation is needed.

