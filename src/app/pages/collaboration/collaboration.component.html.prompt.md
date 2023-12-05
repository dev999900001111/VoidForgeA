# Detailed Screen Design Document

## Screen name
CollaborationComponent

## Description
The CollaborationComponent is a dedicated screen within the web application that allows users to manage collaboration settings, view and leave comments, and handle version control for a specific project. This component is designed to facilitate teamwork and ensure that multiple users can work together efficiently on the same project.

## Elements to be used

### Angular elements
- CollaborationComponent(@Input:{project: Project}, @Output:{})

### Angular dialogs
- SharingSettingsComponent(MAT_DIALOG_DATA:{})
- VersionControlComponent(MAT_DIALOG_DATA:{})

### HTML components
- mat-tab-group

## Screen layout
The CollaborationComponent will be structured using a `mat-tab-group` to organize the different aspects of collaboration into tabs. The tabs will include "Sharing Settings", "Comments", and "Version Control". Each tab will correspond to a child component that handles the specific functionality:

1. **Sharing Settings Tab**: This tab will contain the `SharingSettingsComponent`, which allows the user to manage who has access to the project and what level of permissions they have.

2. **Comments Tab**: This tab will display the `CommentsSectionComponent`, where users can view all comments left by collaborators and add their own comments.

3. **Version Control Tab**: This tab will include the `VersionControlComponent`, which lists all the versions of the project and provides options to revert to a previous version if necessary.

## Screen behavior
Upon loading the CollaborationComponent, the user will be presented with the default open tab, which could be the "Sharing Settings" tab. The user can switch between tabs to access different collaboration features. Each tab will load its respective child component and display the relevant information for the project.

## Input Form
There is no direct input form on the CollaborationComponent itself, as input forms are part of the child components.

## Error messages
Error messages may be displayed in the following scenarios:
- Failure to load project collaboration details due to network or server issues.
- Errors in updating sharing settings, such as invalid permissions or unauthorized actions.
- Problems encountered when adding comments, such as submission errors or validation failures.
- Issues with version control operations, like errors during version reversion or retrieval of version history.

## Model classes used (excluding use from child components)
- Project(id: number, name: string, description: string, ownerId: number, templateId: number, content: string, status: ProjectStatus, collaborators: User[], createdAt: Date, updatedAt: Date)

## Service classes and methods used (excluding calls from child components)
- CollaborationService: 
  - getCollaborators(projectId: number): Observable<User[]>
  - addCollaborator(projectId: number, userId: number): Observable<boolean>
  - removeCollaborator(projectId: number, userId: number): Observable<boolean>
  - getComments(projectId: number): Observable<Comment[]>
  - addComment(projectId: number, content: string): Observable<Comment>
  - getProjectVersions(projectId: number): Observable<Version[]>
  - revertToVersion(projectId: number, versionId: number): Observable<boolean>

The CollaborationComponent will utilize the `CollaborationService` to fetch and manage collaboration-related data. It will not directly call the service methods for adding comments or reverting versions, as these actions are handled by the child components. However, it will use the service to retrieve the initial data required to populate the child components, such as the list of collaborators, comments, and project versions.


## @Input (as Angular element)

- project: Project


## @Output (as Angular element)


## MAT_DIALOG_DATA (as Angular dialog)



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



# prompt

Please carefully review the design information up to this point and create the html for the CollaborationComponent, keeping in mind the division of roles according to the screen list.
Please be sure to inspect the following points before submitting your work.
- Please use AngularMaterial to create a polished design.
- Calibrate the screen with only the given components.
- Do not use name specified for @Output.
- screen should be for Japanese.
- Note the component names (especially the suffixes).
Please respond only to collaboration.component.html.

