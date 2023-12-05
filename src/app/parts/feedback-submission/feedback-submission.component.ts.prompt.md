
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



# FeedbackSubmissionComponent

## Detailed Screen Design Document

### Screen name
FeedbackSubmissionComponent

### Description
The FeedbackSubmissionComponent allows users to submit feedback about the application. It is a form where users can enter their feedback and submit it to the system. This component is crucial for gathering user insights and improving the application based on user suggestions and reported issues.

### Elements to be used

#### Angular elements
- FeedbackSubmissionComponent(@Input:{}, @Output:{submit: EventEmitter<Feedback>})

#### Angular dialogs
- FeedbackSubmissionDialog(MAT_DIALOG_DATA:{}, @Output:{submit: EventEmitter<Feedback>})

#### HTML components
- mat-form-field
- button (for submission)

### Screen layout
The FeedbackSubmissionComponent will be a simple form with the following layout:
1. A `mat-form-field` for the feedback text area where users can type their feedback.
2. A submit button that users can click to send their feedback.

### Screen behavior
- When the user enters text into the feedback form field and clicks the submit button, the `submit` event is emitted with the feedback data.
- If the feedback submission is successful, a confirmation message or dialog should be displayed.
- If there is an error during submission, an appropriate error message should be shown to the user.

### Input Form
The input form will consist of:
- A multiline text area for the feedback content, which is required before submission.

### Error messages
- "Feedback cannot be empty." - When the submit button is clicked without any feedback entered.
- "Failed to submit feedback. Please try again later." - When there is an error in submitting the feedback to the server.

### Model classes used (excluding use from child components)
- Feedback(id: number, userId: number, content: string, createdAt: Date)

### Service classes and methods used (excluding calls from child components)
- SupportService: submitFeedback(undefined: Feedback): Observable<boolean>

The `submitFeedback` method of the `SupportService` will be used to send the user's feedback to the backend. It takes a `Feedback` object as a parameter and returns an `Observable<boolean>` indicating the success or failure of the operation.


### @Input (as Angular element)


### @Output (as Angular element)

- submit: EventEmitter<any>


### MAT_DIALOG_DATA (as Angular dialog)

### Here's a list of the variables, constants, ViewChild, and functions that would be needed in the TypeScript file to support the provided Angular template:

### Variables:
1. `feedback`: Object - An object to hold the feedback content that is bound to the textarea via `ngModel`.

### Constants:
1. `MIN_FEEDBACK_LENGTH`: number - A constant to define the minimum length of the feedback content. This could be used in place of the hardcoded '10' in the `minlength` validator.

### ViewChild:
1. `feedbackForm`: NgForm - A reference to the form instance in the template, accessed via the `#feedbackForm` template reference variable. This is used to interact with the form programmatically.

### Functions:
1. `submit`: EventEmitter<any> - An event emitter function that emits the form value when the form is submitted. The type `any` can be replaced with a more specific type or interface that represents the structure of the feedback form's data.

### Additional Notes:
- The `full-width` and `feedback-submit-button` classes mentioned in the notes would be defined in the component's CSS and are not part of the TypeScript file.
- The `mat-table` column names are not present in the provided HTML snippet. If they were, they would be constants representing the identifiers for each column in the table.

### Here's an example of how the TypeScript code might look:

```typescript
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
  @ViewChild('feedbackForm') feedbackForm: NgForm;
  feedback = {
    content: ''
  };
  submit = new EventEmitter<any>();

  MIN_FEEDBACK_LENGTH = 10;

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.submit.emit(this.feedbackForm.value);
    }
  }
}
```

In this example, `onSubmit` is a method that could be called when the form is submitted, checking if the form is valid before emitting the form value. The `MIN_FEEDBACK_LENGTH` constant is used to define the minimum length of the feedback content, which could be used in the template and in any validation logic within the TypeScript file.


## typescript template

```typescript
// src/app/parts/feedback-submission.component.ts
import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models';
import { SupportService } from '../../services';

@Component({
    selector: 'app-feedback-submission',
    templateUrl: './feedback-submission.component.html',
    styleUrls: ['./feedback-submission.component.scss']
})
class  FeedbackSubmissionComponent implements OnInit {

    // An object to hold the feedback content that is bound to the textarea via ngModel.
    feedback: Object;


    // A constant to define the minimum length of the feedback content. This could be used in place of the hardcoded '10' in the minlength validator.
    MIN_FEEDBACK_LENGTH: number;


    @Output() submit: EventEmitter<any>;


    // A reference to the form instance in the template, accessed via the #feedbackForm template reference variable. This is used to interact with the form programmatically.
    @ViewChild('feedbackForm') feedbackForm: NgForm;

    constructor(private supportService: SupportService) {
    }

    ngOnInit(): void {
    }

    /**
     * An event emitter function that emits the form value when the form is submitted. The type any can be replaced with a more specific type or interface that represents the structure of the feedback form's data.
     */
    submit(): EventEmitter<any> {
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
Please write feedback-submission.component.ts, as no explanation is needed.

