// ./src/app/models.ts

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED'
}

export enum PermissionLevel {
  OWNER = 'OWNER',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH_NOTIFICATION = 'PUSH_NOTIFICATION'
}

export enum FilterType {
  CATEGORY = 'CATEGORY',
  DATE = 'DATE',
  STATUS = 'STATUS'
}

export enum ContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO'
}

export enum InteractiveElementType {
  QUIZ = 'QUIZ',
  POLL = 'POLL',
  SURVEY = 'SURVEY',
  FORM = 'FORM'
}

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    // public role: UserRole,
    // public profilePictureUrl: string
  ) { }
}

export class Project {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public ownerId: number,
    public templateId: number,
    public content: string,
    public status: ProjectStatus,
    public collaborators: User[],
    public createdAt: Date,
    public updatedAt: Date
  ) { }
}

export class Comment {
  constructor(
    public id: number,
    public authorId: number,
    public projectId: number,
    public content: string,
    public createdAt: Date
  ) { }
}

export class Version {
  constructor(
    public id: number,
    public projectId: number,
    public versionNumber: number,
    public createdAt: Date
  ) { }
}

export class Permission {
  constructor(
    public userId: number,
    public projectId: number,
    public permissionLevel: PermissionLevel
  ) { }
}

export class Template {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public thumbnailUrl: string
  ) { }
}

export class NotificationSetting {
  constructor(
    public userId: number,
    public type: NotificationType,
    public enabled: boolean
  ) { }
}

export class Filter {
  constructor(
    public type: FilterType,
    public value: string
  ) { }
}

export class Content {
  constructor(
    public id: number,
    public projectId: number,
    public type: ContentType,
    public data: string
  ) { }
}

export class InteractiveElement {
  constructor(
    public id: number,
    public projectId: number,
    public type: InteractiveElementType,
    public data: string
  ) { }
}

export class FAQ {
  constructor(
    public id: number,
    public question: string,
    public answer: string
  ) { }
}

export class Feedback {
  constructor(
    public id: number,
    public userId: number,
    public content: string,
    public createdAt: Date
  ) { }
}

export class TwoFactorAuthDetails {
  constructor(
    public userId: number,
    public secret: string,
    public qrCodeUrl: string
  ) { }
}

export class Notification {
  constructor(
    public id: number,
    public recipientId: number,
    public message: string,
    public createdAt: Date
  ) { }
}

export type GPTModels = 'gpt-4' | 'gpt-4-0314' | 'gpt-4-0613' | 'gpt-4-32k' | 'gpt-4-32k-0314' | 'gpt-4-32k-0613' | 'gpt-4-1106-preview' | 'gpt-3.5-turbo' | 'gpt-3.5-turbo-0301' | 'gpt-3.5-turbo-0613' | 'gpt-3.5-turbo-16k' | 'gpt-3.5-turbo-16k-0613';

export interface ChatCompletionStreamInDto {
  args: {
    messages: { role: 'system' | 'user' | 'assistant', content: string }[],
    model?: GPTModels,
    temperature?: number,
    top_p?: number,
    response_format?: { type: 'text' | 'json_object' }
  };
  options?: {
    idempotencyKey: string
  };
}
