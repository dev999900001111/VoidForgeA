
# Reference


## All HTTP API List

# Improved APIs List

| Method | Path                                 | RequestBody                                                                 | ResponseBody                                                                                   |
|--------|--------------------------------------|-----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| POST   | /auth/login                         | { email: string, password: string }                                         | { user: User, token: string }                                                                  |
| POST   | /auth/register                      | { user: User }                                                              | { user: User, token: string }                                                                  |
| PUT    | /auth/update-profile                | { user: User }                                                              | { user: User }                                                                                 |
| PUT    | /auth/change-password               | { oldPassword: string, newPassword: string }                                | { success: boolean }                                                                           |
| POST   | /auth/setup-two-factor              | { userId: number }                                                          | { twoFactorAuthDetails: TwoFactorAuthDetails }                                                 |
| POST   | /auth/verify-two-factor             | { userId: number, code: string }                                            | { success: boolean }                                                                           |
| GET    | /projects/user/{userId}             |                                                                             | { projects: Project[] }                                                                        |
| POST   | /projects                           | { project: Project }                                                        | { project: Project }                                                                           |
| PUT    | /projects/{projectId}               | { project: Project }                                                        | { project: Project }                                                                           |
| DELETE | /projects/{projectId}               |                                                                             | { success: boolean }                                                                           |
| GET    | /projects/{projectId}               |                                                                             | { project: Project }                                                                           |
| POST   | /projects/{projectId}/publish       |                                                                             | { success: boolean }                                                                           |
| GET    | /projects/{projectId}/collaborators |                                                                             | { collaborators: User[] }                                                                      |
| POST   | /projects/{projectId}/collaborators | { userId: number }                                                          | { success: boolean }                                                                           |
| DELETE | /projects/{projectId}/collaborators/{userId} |                                                                             | { success: boolean }                                                                           |
| GET    | /projects/{projectId}/comments      |                                                                             | { comments: Comment[] }                                                                        |
| POST   | /projects/{projectId}/comments      | { comment: Comment }                                                        | { comment: Comment }                                                                           |
| GET    | /projects/{projectId}/versions      |                                                                             | { versions: Version[] }                                                                        |
| POST   | /projects/{projectId}/versions/{versionId}/revert |                                                                             | { success: boolean }                                                                           |
| GET    | /users/{userId}                     |                                                                             | { user: User }                                                                                 |
| PUT    | /users/{userId}                     | { user: User }                                                              | { user: User }                                                                                 |
| GET    | /users/{userId}/notifications       |                                                                             | { settings: NotificationSetting[] }                                                            |
| PUT    | /users/{userId}/notifications       | { settings: NotificationSetting[] }                                         | { success: boolean }                                                                           |
| GET    | /search/projects                    | { query: string, filters: Filter[] }                                        | { projects: Project[] }                                                                        |
| GET    | /search/suggested/{userId}          |                                                                             | { content: Content[] }                                                                         |
| GET    | /templates                          |                                                                             | { templates: Template[] }                                                                      |
| GET    | /templates/{templateId}             |                                                                             | { template: Template }                                                                         |
| GET    | /support/faqs                       |                                                                             | { faqs: FAQ[] }                                                                                |
| POST   | /support/feedback                   | { feedback: Feedback }                                                      | { success: boolean }                                                                           |
| GET    | /content/{projectId}                |                                                                             | { content: string }                                                                            |
| PUT    | /content/{projectId}                | { content: string }                                                         | { success: boolean }                                                                           |
| POST   | /content/{projectId}/interactive-elements | { element: InteractiveElement }                                          | { interactiveElement: InteractiveElement }                                                     |
| DELETE | /content/{projectId}/interactive-elements/{elementId} |                                                                             | { success: boolean }                                                                           |
| POST   | /notifications/send                 | { userId: number, notification: Notification }                              | { success: boolean }                                                                           |

This API list has been reviewed and improved by experts in various fields to ensure that it is comprehensive, secure, user-friendly, and consistent with the system's requirements. The list includes essential endpoints for user authentication, project management, collaboration, user preferences, search functionality, template retrieval, support, content management, and notifications. Each endpoint is designed to provide a clear and concise contract between the client and server, with well-defined request and response bodies.


## All Model Classes

export class InteractiveElement {constructor(public id: number,public projectId: number,public type: InteractiveElementType,public data: string) {}}



# Service Class Name

ContentService



# Service Class Definition

{"path":"./src/app/services/content.service.ts","models":["InteractiveElement"],"methods":[{"name":"getContent","params":[{"projectId":"number"}],"return":"Observable<string>"},{"name":"updateContent","params":[{"projectId":"number"},{"content":"string"}],"return":"Observable<boolean>"},{"name":"addInteractiveElement","params":[{"projectId":"number"},{"element":"InteractiveElement"}],"return":"Observable<InteractiveElement>"},{"name":"removeInteractiveElement","params":[{"projectId":"number"},{"elementId":"number"}],"return":"Observable<boolean>"}]}



# prompt

Please create an ContentService as Angular Service class.
Add functions that are not in the service class definition as needed.
step by step:
- import all required libraries.
- Authentication tokens for request headers should be get from the authService.getToken.
- Write all implementations.
- Pay close attention to the difference between the HTTP API's ResponseBody Type and the service's Return Type. Even if they are almost the same, they are often slightly different, so use pipe(map()) or other methods to adjust them.
- ResponseBody is returned as String type even if it is written as Date. As a function of the Service class, it must be converted to the Date type according to the model class type.
Only output the source code.

