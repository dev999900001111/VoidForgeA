# Detailed Screen Design Document
## Screen name
TwoFactorAuthDialog

## Description
The TwoFactorAuthDialog is a modal dialog that provides users with the necessary steps and information to set up two-factor authentication (2FA) for their account. This additional security feature requires users to provide a second form of identification beyond just a password, typically a code generated by an authenticator app. The dialog will guide the user through the process of enabling 2FA and verifying it with a temporary code.

## Elements to be used
### Angular elements
- SecurityComponent(@Input:{}, @Output:{})

### Angular dialogs
- TwoFactorAuthDialog(MAT_DIALOG_DATA:{})

### HTML components
- mat-dialog-content

## Screen layout
The TwoFactorAuthDialog will consist of the following sections:
1. Title: "Set up Two-Factor Authentication"
2. Instructional Text: Briefly explains the importance of 2FA and how it works.
3. QR Code: A dynamically generated QR code that the user can scan with their authenticator app.
4. Input Field: For the user to enter the verification code from their authenticator app.
5. Action Buttons: "Cancel" to close the dialog without enabling 2FA, and "Verify" to submit the verification code and enable 2FA.

## Screen behavior
- When the dialog opens, it should display the QR code generated for the user's account.
- The user scans the QR code with their authenticator app, which adds their account to the app and starts generating temporary codes.
- The user enters a temporary code from the app into the input field.
- If the user clicks "Verify" and the code is correct, 2FA is enabled for their account, and the dialog closes with a success message.
- If the code is incorrect, an error message is displayed, and the user is prompted to try again.
- Clicking "Cancel" closes the dialog without enabling 2FA.

## Input Form
- Verification Code Input: A text field where the user enters the 6-digit code from their authenticator app.

## Error messages
- "Invalid code. Please try again.": Displayed if the verification code entered is incorrect or expired.
- "Failed to enable two-factor authentication. Please try again later.": Displayed if there is a server error or connectivity issue.

## Model classes used (excluding use from child components)
- TwoFactorAuthDetails(userId: number, secret: string, qrCodeUrl: string)

## Service classes and methods used (excluding calls from child components)
- AuthService: setupTwoFactorAuth(undefined: undefined): Observable<TwoFactorAuthDetails>, verifyTwoFactorAuthCode(undefined: undefined, undefined: undefined): Observable<boolean>

The AuthService's `setupTwoFactorAuth` method will be used to generate the necessary details for 2FA, including the QR code URL. The `verifyTwoFactorAuthCode` method will be used to verify the code entered by the user and enable 2FA on their account.


## @Input (as Angular element)


## @Output (as Angular element)

- setup: EventEmitter<any>


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

Please carefully review the design information up to this point and create the html for the TwoFactorAuthDialog, keeping in mind the division of roles according to the screen list.
Please be sure to inspect the following points before submitting your work.
- Please use AngularMaterial to create a polished design.
- Calibrate the screen with only the given components.
- Do not use name specified for @Output.
- screen should be for Japanese.
- Note the component names (especially the suffixes).
Please respond only to two-factor-auth-dialog.component.html.

