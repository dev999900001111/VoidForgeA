
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



# TemplateSelectionComponent

## Detailed Screen Design Document
### Screen name
TemplateSelectionComponent

### Description
The TemplateSelectionComponent is a part of the ProjectCreationEditComponent where users can select a template for their project. It provides a dropdown menu that lists all available templates, allowing the user to choose one that best fits the type of project they are creating.

### Elements to be used
#### Angular elements
- ProjectCreationEditComponent(@Input:{project: Project}, @Output:{save: EventEmitter<any>})

#### Angular dialogs
- None

#### HTML components
- mat-select

### Screen layout
The TemplateSelectionComponent will be displayed as a dropdown menu within the ProjectCreationEditComponent. It will be positioned prominently so that it is one of the first elements a user interacts with when creating or editing a project. The dropdown will be labeled "Select Template" and will list all available templates by name. When a template is selected, a thumbnail preview and a short description of the selected template may be displayed next to the dropdown for user confirmation.

### Screen behavior
When the user clicks on the dropdown, it will expand to show all available templates. The user can scroll through the list and select a template. Upon selection, the dropdown will collapse, and the selected template name will be displayed in the dropdown field. The ProjectCreationEditComponent will be updated to reflect the selected template.

### Input Form
The input form will consist of the mat-select dropdown component. The user will not enter data manually; instead, they will choose from a list of predefined options.

### Error messages
- "Failed to load templates": This error message will be displayed if there is an issue retrieving the list of templates from the server.
- "Please select a template": This message may be shown if the user attempts to proceed without selecting a template.

### Model classes used (excluding use from child components)
- Template(id: number, name: string, description: string, thumbnailUrl: string)

### Service classes and methods used (excluding calls from child components)
- TemplateService: getTemplates(): Observable<Template[]>
  This service will be used to retrieve the list of available templates from the server when the component is initialized. The retrieved templates will be passed to the mat-select dropdown for the user to choose from.


### @Input (as Angular element)

- templates: Template[]


### @Output (as Angular element)

- select: EventEmitter<any>


### MAT_DIALOG_DATA (as Angular dialog)

### Below is a list of the variables, constants, ViewChild, and functions that would be needed in the TypeScript file to support the provided Angular template:

### Variables:
1. `selectedTemplate`, type: `TemplateType`, description: Holds the currently selected template object from the dropdown.
2. `templates`, type: `TemplateType[]`, description: An array of template objects to populate the dropdown options.

### Constants:
1. `COLUMN_NAMES`, type: `string[]`, description: An array of strings representing the column names for the `mat-table` if it were present in the template (not shown in the provided HTML).

### ViewChild:
(No `ViewChild` is indicated in the provided HTML, but if there were a need to directly access a child component or a DOM element, it would be listed here.)

### Functions:
1. `select.emit`, type: `function`, description: Emits the selected template to the parent component when a new selection is made in the dropdown.

### Types:
1. `TemplateType`, type: `interface/class`, description: Defines the structure of a template object, which should at least include `name`, `thumbnailUrl`, and `description` properties to match the template bindings.

### Additional Notes:
- The `selectedTemplate` and `templates` variables are likely decorated with `@Input()` if they are intended to be passed in from a parent component.
- The `select` mentioned in the `(selectionChange)` event binding is likely an `@Output()` EventEmitter that the component uses to emit events to the parent component.
- The `TemplateType` would be a custom type or interface that you define to match the structure of the objects you expect to be in the `templates` array.

### Here's an example of how the `TemplateType` interface and `select` `@Output()` might be defined:

```typescript
import { Component, Output, EventEmitter, Input } from '@angular/core';

interface TemplateType {
  name: string;
  thumbnailUrl: string;
  description: string;
}

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css']
})
export class TemplateSelectorComponent {
  @Input() selectedTemplate: TemplateType;
  @Input() templates: TemplateType[];
  @Output() select = new EventEmitter<TemplateType>();

  // Constants for mat-table column names, if needed
  readonly COLUMN_NAMES: string[] = ['columnName1', 'columnName2', 'columnName3'];

  // Function to emit the selected template
  onSelectionChange(value: TemplateType): void {
    this.select.emit(value);
  }
}
```

In this example, the `onSelectionChange` function would replace the `(selectionChange)="select.emit($event.value)"` in the template with `(selectionChange)="onSelectionChange($event.value)"`.


## typescript template

```typescript
// src/app/parts/template-selection.component.ts
import { Component, OnInit } from '@angular/core';
import { Template } from '../../models';
import { TemplateService } from '../../services';

@Component({
    selector: 'app-template-selection',
    templateUrl: './template-selection.component.html',
    styleUrls: ['./template-selection.component.scss']
})
class  TemplateSelectionComponent implements OnInit {

    // Holds the currently selected template object from the dropdown.
    selectedTemplate: TemplateType;

    // An array of template objects to populate the dropdown options.
    templates: TemplateType[];


    // An array of strings representing the column names for the mat-table if it were present in the template (not shown in the provided HTML).
    COLUMN_NAMES: string[];


    @Input() templates: Template[];
    @Output() select: EventEmitter<any>;




    constructor(private templateService: TemplateService) {
    }

    ngOnInit(): void {
    }

    /**
     * Emits the selected template to the parent component when a new selection is made in the dropdown.
     */
    select.emit(): function {
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
Please write template-selection.component.ts, as no explanation is needed.

