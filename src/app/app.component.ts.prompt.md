
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



# AppComponent

## Detailed Screen Design Document

### Screen name
AppComponent

### Description
The AppComponent serves as the root container for the web application. It is responsible for hosting the primary navigation structure and the main content area where child components are rendered based on the current route. It provides the overall layout and structure for the application, including the header, footer, and navigation sidebars if applicable.

### Elements to be used

#### Angular elements
- HeaderComponent(@Input:{user: User}, @Output:{logout: EventEmitter<any>})
- FooterComponent
- RouterOutlet

#### Angular dialogs
- None (AppComponent does not directly use any dialogs)

#### HTML components
- mat-sidenav-container

### Screen layout
The AppComponent should have a clean and intuitive layout that is consistent across different screens. The layout includes:

1. A header at the top of the screen that contains the application logo, navigation links, and user profile information.
2. A main content area where child components (such as DashboardComponent, ProjectCreationEditComponent, etc.) are displayed depending on the current route.
3. A footer at the bottom of the screen that contains links to Help/Support, Terms of Service, and other relevant information.

The mat-sidenav-container can be used if a side navigation menu is part of the design for larger screens or devices.

### Screen behavior
- The header should update to reflect the current user's information and provide a logout button.
- The main content area should change based on the navigation actions performed by the user, displaying the appropriate child component.
- The footer should remain static across different views.

### Input Form
- None (AppComponent does not directly contain any input forms)

### Error messages
- None (AppComponent does not directly handle error messages; these are managed by child components)

### Model classes used (excluding use from child components)
- User (for displaying user information in the HeaderComponent)

### Service classes and methods used (excluding calls from child components)
- AuthService: logout() (to handle user logout actions from the HeaderComponent)


### @Input (as Angular element)


### @Output (as Angular element)


### MAT_DIALOG_DATA (as Angular dialog)

### Here's a list of the variables, constants, ViewChild, and functions that would be needed in the TypeScript file (`app.component.ts`) to support the provided Angular template:

### 1. Variables:
   - `user`, Type: `User`, Description: An object representing the logged-in user's information. This would typically include properties like name, email, etc.

### 2. Constants:
   - No explicit constants are defined in the HTML template for the `mat-table` column names. However, if a `mat-table` were to be used within the `router-outlet`, you would define constants for the column names in the component that contains the `mat-table`.

### 3. ViewChild:
   - `sidenav`, Type: `MatSidenav`, Description: A reference to the `MatSidenav` instance to control its open and close behavior programmatically.

### 4. Functions:
   - `onLogout`, Type: `Function`, Description: A method to be called when the user clicks the logout button. This function would handle the logic for logging the user out of the application.

Please note that the actual implementation details, such as the `User` type or the `MatSidenav` type, would depend on the specific application and its dependencies. The `User` type would typically be an interface or a class defined in the application to model the user data, and `MatSidenav` is a component provided by Angular Material.


## typescript template

```typescript
// src/app/pages/app.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
    selector: 'app-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
class  AppComponent implements OnInit {

    // An object representing the logged-in user's information.
    user: User;







    // A reference to the MatSidenav instance to control its open and close behavior programmatically.
    @ViewChild('sidenav') sidenav: MatSidenav;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    /**
     * A method to be called when the user clicks the logout button. This function would handle the logic for logging the user out of the application.
     */
    onLogout(): Function {
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
Please write app.component.ts, as no explanation is needed.

