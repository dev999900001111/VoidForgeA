
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



# HelpSupportComponent

## Detailed Screen Design Document

### Screen name
HelpSupportComponent

### Description
The HelpSupportComponent is a dedicated screen within the web application where users can access frequently asked questions (FAQs) and submit feedback about the application. This component is designed to provide users with self-service support and a direct channel to communicate with the application's support team.

### Elements to be used

#### Angular elements
- HelpSupportComponent(@Input:{faqs: FAQ[]}, @Output:{})

#### Angular dialogs
- FeedbackSubmissionDialog(MAT_DIALOG_DATA:{})

#### HTML components
- mat-accordion

### Screen layout
The HelpSupportComponent will be structured with two main sections:

1. **FAQ Section**: This section will use the `mat-accordion` component to display a list of FAQs. Each FAQ will be an expandable panel that reveals the answer when clicked.

2. **Feedback Section**: This section will provide a button or link that, when clicked, opens the `FeedbackSubmissionDialog` where users can submit their feedback.

### Screen behavior
- **FAQ Interaction**: Users can click on any FAQ to expand the accordion panel and read the answer. Clicking again will collapse the panel.
- **Submit Feedback**: When the user clicks the button to submit feedback, the `FeedbackSubmissionDialog` will open, allowing the user to enter and submit their feedback.

### Input Form
There is no direct input form on the HelpSupportComponent itself. The input form for submitting feedback is part of the `FeedbackSubmissionDialog`.

### Error messages
Error messages are not directly handled by the HelpSupportComponent. However, if there is an issue loading the FAQs or submitting feedback through the dialog, appropriate error handling should be implemented to inform the user of the issue.

### Model classes used (excluding use from child components)
- FAQ(id: number, question: string, answer: string)

### Service classes and methods used (excluding calls from child components)
- SupportService: getFAQs(): Observable<FAQ[]>
- SupportService: submitFeedback(undefined: undefined): Observable<boolean>

The `SupportService`'s `getFAQs` method will be used to retrieve the list of FAQs to be displayed in the accordion. The `submitFeedback` method will be used to handle the submission of user feedback through the `FeedbackSubmissionDialog`.


### @Input (as Angular element)

- faqs: FAQ[]


### @Output (as Angular element)


### MAT_DIALOG_DATA (as Angular dialog)

```plaintext
### Variables:
- faqs, Array<{ question: string, answer: string }>, An array of objects where each object contains a 'question' and an 'answer' string for the FAQ section.

### Functions:
- openFeedbackDialog(), void, A function that is called when the "Submit Feedback" button is clicked. It is responsible for opening the feedback dialog where users can submit their feedback.

### Constants:
- There are no explicit constants defined in the provided HTML snippet. However, if the mat-table column names are to be considered constants, they are not present in the snippet. If they were, they would be defined as an array of strings representing the column names in the mat-table component.
```

Note: The provided HTML snippet does not include a `mat-table` component, so there are no column names to list as constants. If a `mat-table` were present, the column names would typically be defined in the TypeScript file as an array of strings. Additionally, since the HTML snippet does not include any `ViewChild` references, none are listed. If there were `ViewChild` references, they would be listed with their selector strings and the type of element or component they are referencing.


## typescript template

```typescript
// src/app/pages/help-support.component.ts
import { Component, OnInit } from '@angular/core';
import { FAQ } from '../../models';
import { SupportService } from '../../services';

@Component({
    selector: 'app-help-support',
    templateUrl: './help-support.component.html',
    styleUrls: ['./help-support.component.scss']
})
class  HelpSupportComponent implements OnInit {

    // An array of objects where each object contains a 'question' and an 'answer' string for the FAQ section.
    faqs: Array<{ question: string, answer: string }>;





    @Input() faqs: FAQ[];




    constructor(private supportService: SupportService) {
    }

    ngOnInit(): void {
    }

    /**
     * A function that is called when the 'Submit Feedback' button is clicked. It is responsible for opening the feedback dialog where users can submit their feedback.
     */
    openFeedbackDialog(): void {
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
Please write help-support.component.ts, as no explanation is needed.

