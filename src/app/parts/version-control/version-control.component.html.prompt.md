# Detailed Screen Design Document

## Screen name
VersionControlComponent

## Description
The VersionControlComponent is a part of the CollaborationComponent, which allows users to manage different versions of a project. It provides a list of all the versions that have been saved, with the ability to revert to a specific version if needed. This component is crucial for maintaining the integrity of the project and for allowing users to track changes over time.

## Elements to be used

### Angular elements
- VersionControlComponent(@Input:{versions: Version[]}, @Output:{revert: EventEmitter<any>})

### Angular dialogs
- VersionRevertDialog(MAT_DIALOG_DATA:{version: Version}, @Output:{revert: EventEmitter<any>})

### HTML components
- mat-list

## Screen layout
The VersionControlComponent will be displayed as a list within the CollaborationComponent tab layout. Each list item will represent a version of the project, showing the version number and the date it was created. There will be a button or icon next to each version that, when clicked, will open the VersionRevertDialog to confirm the action of reverting to that version.

## Screen behavior
When the user navigates to the VersionControlComponent, the component will display a list of all versions of the current project. The user can scroll through the list to find a specific version. Upon clicking the revert button next to a version, the VersionRevertDialog will appear, asking the user to confirm the revert action. If the user confirms, the revert event will be emitted, triggering the reversion to the selected version.

## Input Form
There is no input form directly within the VersionControlComponent. All interactions are based on selection and confirmation actions.

## Error messages
- "Failed to load project versions. Please try again later."
- "Error reverting to the selected version. Please try again."

## Model classes used (excluding use from child components)
- Version(id: number, projectId: number, versionNumber: number, createdAt: Date)

## Service classes and methods used (excluding calls from child components)
- CollaborationService: getProjectVersions(projectId: number): Observable<Version[]>
- CollaborationService: revertToVersion(projectId: number, versionId: number): Observable<boolean>


## @Input (as Angular element)

- versions: Version[]


## @Output (as Angular element)

- revert: EventEmitter<any>


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

Please carefully review the design information up to this point and create the html for the VersionControlComponent, keeping in mind the division of roles according to the screen list.
Please be sure to inspect the following points before submitting your work.
- Please use AngularMaterial to create a polished design.
- Calibrate the screen with only the given components.
- Do not use name specified for @Output.
- screen should be for Japanese.
- Note the component names (especially the suffixes).
Please respond only to version-control.component.html.

