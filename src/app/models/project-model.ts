export enum DevelopmentStageType {
    Deployment = 'Deployment',
    Design = 'Design',
    Implementation = 'Implementation',
    Maintenance = 'Maintenance',
    ProjectManagement = 'ProjectManagement',
    RequirementAnalysis = 'RequirementAnalysis',
    Testing = 'Testing'
}

export enum DocumentSubType {
    ApiDocumentation = 'APIDocumentation',
    BusinessRequirements = 'BusinessRequirements',
    ChangeLog = 'ChangeLog',
    DatabaseDesign = 'DatabaseDesign',
    DeploymentStrategy = 'DeploymentStrategy',
    DetailedDesign = 'DetailedDesign',
    DevelopmentGuidelines = 'DevelopmentGuidelines',
    FeatureRequirements = 'FeatureRequirements',
    FeatureListSummary = 'FeatureListSummary',
    FeatureListDetail = 'FeatureListDetail',
    HighLevelDesign = 'HighLevelDesign',
    InstallationGuide = 'InstallationGuide',
    InterfaceDesign = 'InterfaceDesign',
    LowLevelDesign = 'LowLevelDesign',
    MaintenanceManual = 'MaintenanceManual',
    MeetingAgenda = 'MeetingAgenda',
    MeetingMinutes = 'MeetingMinutes',
    ProjectCharter = 'ProjectCharter',
    ProjectSchedule = 'ProjectSchedule',
    ReleaseNotes = 'ReleaseNotes',
    RiskAssessment = 'RiskAssessment',
    ScreenDesign = 'ScreenDesign',
    ScreenTransitionDiagram = 'ScreenTransitionDiagram',
    SourceCode = 'SourceCode',
    StakeholderCommunication = 'StakeholderCommunication',
    SystemRequirements = 'SystemRequirements',
    TechnicalSpecifications = 'TechnicalSpecifications',
    TestCase = 'TestCase',
    TestPlan = 'TestPlan',
    TestReport = 'TestReport',
    UserStories = 'UserStories'
}

export enum DocumentType {
    DeploymentPlan = 'DeploymentPlan',
    DesignSpecifications = 'DesignSpecifications',
    ImplementationGuide = 'ImplementationGuide',
    MaintenanceLog = 'MaintenanceLog',
    MeetingNotes = 'MeetingNotes',
    ProjectPlan = 'ProjectPlan',
    Requirements = 'Requirements',
    TestCases = 'TestCases'
}

export enum NotificationType {
    Email = 'Email',
    Slack = 'Slack',
    Webhook = 'Webhook'
}

export enum PermissionLevel {
    Admin = 'Admin',
    Editor = 'Editor',
    Owner = 'Owner',
    Viewer = 'Viewer'
}


export enum ProjectStatus {
    NotStarted = 'NotStarted',         // 未開始
    InProgress = 'InProgress',         // 進行中
    OnHold = 'OnHold',                 // 中断
    Completed = 'Completed',           // 完了
    Cancelled = 'Cancelled',           // 中止
    PendingReview = 'PendingReview',   // レビュー待ち
    Reviewed = 'Reviewed',             // レビュー済み
    Approved = 'Approved',             // 承認済み
    Rejected = 'Rejected',             // 拒否
    Pending = 'Pending',               // 保留
    Incomplete = 'Incomplete',         // 未完了
    Deleted = 'Deleted',               // 削除済み
    Hidden = 'Hidden',                 // 非表示
}


export interface Document {
    id: number;
    type: DocumentType;
    subType: DocumentSubType;
    title: string;
    content: string;
    status: ProjectStatus;
}

export interface Discussion {
    id: number;
    topic: string;
    logLabel: string;
    participants: string[];
    statements: Statement[];
}

export interface Statement {
    id: number;
    sequence: number;
    speaker: string;
    content: string;
    discussion: Discussion;
}

export interface Task {
    id: number;
    name: string;
    documents: Document[];
    discussions: Discussion[];
    status: ProjectStatus;
}

export interface DevelopmentStage {
    id: number;
    type: DevelopmentStageType;
    name: string;
    // documents: Document[];
    // discussions: Discussion[];
    tasks: Task[];
    status: ProjectStatus;
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    label: string;
    stages: DevelopmentStage[];
    status: ProjectStatus;
}

// export enum ProjectStatus {
//     NotStarted = '未開始',
//     InProgress = '進行中',
//     OnHold = '中断',
//     Completed = '完了',
//     Cancelled = '中止',
//     PendingReview = 'レビュー待ち'
// }

// export enum DevelopmentStageType {
//     RequirementAnalysis = 'Requirement Analysis',
//     Design = 'Design',
//     Implementation = 'Implementation',
//     Testing = 'Testing',
//     Deployment = 'Deployment',
//     Maintenance = 'Maintenance',
//     ProjectManagement = 'Project Management'
// }

// export enum PermissionLevel {
//     Owner = 'Owner',
//     Admin = 'Admin',
//     Editor = 'Editor',
//     Viewer = 'Viewer'
// }

// export enum NotificationType {
//     Email = 'Email',
//     Slack = 'Slack',
//     Webhook = 'Webhook'
// }

// export enum DocumentType {
//     Requirements = 'Requirements',
//     DesignSpecifications = 'Design Specifications',
//     ImplementationGuide = 'Implementation Guide',
//     TestCases = 'Test Cases',
//     DeploymentPlan = 'Deployment Plan',
//     MaintenanceLog = 'Maintenance Log',
//     ProjectPlan = 'Project Plan',
//     MeetingNotes = 'Meeting Notes'
// }
// export enum DocumentSubType {
//     // 要件定義関連
//     BusinessRequirements = 'Business Requirements',
//     SystemRequirements = 'System Requirements',
//     UserStories = 'User Stories',

//     // 設計関連
//     HighLevelDesign = 'High Level Design', // 日本語で言うところの「基本設計」
//     DetailedDesign = 'Detailed Design',    // 日本語で言うところの「詳細設計」
//     DatabaseDesign = 'Database Design',    // 日本語で言うところの「DB設計」
//     InterfaceDesign = 'Interface Design',  // 日本語で言うところの「画面設計」

//     // 実装関連
//     TechnicalSpecifications = 'Technical Specifications',
//     DevelopmentGuidelines = 'Development Guidelines',
//     SourceCode = 'Source Code',
//     APIDocumentation = 'APIドキュメント',   // 日本語で言うところの「API設計」

//     // テスト関連
//     TestPlan = 'Test Plan',
//     TestCase = 'Test Case',
//     TestReport = 'Test Report',

//     // デプロイメント関連
//     DeploymentStrategy = 'Deployment Strategy',
//     ReleaseNotes = 'Release Notes',
//     InstallationGuide = 'Installation Guide',

//     // メンテナンス関連
//     MaintenanceManual = 'Maintenance Manual',
//     ChangeLog = 'Change Log',

//     // プロジェクト管理関連
//     ProjectCharter = 'Project Charter',
//     ProjectSchedule = 'Project Schedule',
//     RiskAssessment = 'Risk Assessment',

//     // 会議とコミュニケーション関連
//     MeetingAgenda = 'Meeting Agenda',
//     MeetingMinutes = 'Meeting Minutes',
//     StakeholderCommunication = 'Stakeholder Communication'
// }

// // ### プロジェクトレベル（1:プロジェクト）
// // - **プロジェクト計画書 (Project Plan)**
// // - **リスク管理計画 (Risk Management Plan)**
// // - **プロジェクトスケジュール (Project Schedule)**

// // ### 要件定義レベル（1:プロジェクトまたは1:大規模機能）
// // - **要件仕様書 (Requirements Specification)**
// // - **ビジネス要件定義 (Business Requirements)**
// // - **システム要件定義 (System Requirements)**
// // - **ユーザーストーリー (User Stories)**

// // ### システム設計レベル（1:システム）
// // - **ハイレベル設計 (High Level Design)**
// // - **データベース設計 (Database Design)**
// // - **インターフェース設計 (Interface Design)**

// // ### コンポーネントまたはモジュールレベル（1:N コンポーネント/モジュール）
// // - **詳細設計 (Detailed Design)**
// // - **APIドキュメント (APIDocumentation)**
// // - **データベーススキーマ (Database Design)**

// // ### 実装レベル（1:N 機能/タスク）
// // - **実装ガイド (Implementation Guide)**
// // - **開発環境設定 (Development Environment Setup)**
// // - **ソースコードドキュメント (Source Code Documentation)**

// // ### テストレベル（1:N テストケース/機能）
// // - **テスト計画 (Test Plan)**
// // - **テストケース (Test Cases)**
// // - **テストスクリプト (Test Scripts)**
// // - **テスト報告 (Test Report)**

// // ### デプロイメントレベル（1:リリースまたは1:システム）
// // - **デプロイメント計画 (Deployment Plan)**
// // - **リリースノート (Release Notes)**
// // - **インストールガイド (Installation Guide)**
// // - **運用マニュアル (Operation Manual)**

// // ### メンテナンスレベル（多:N）
// // - **メンテナンスログ (Maintenance Log)**
// // - **変更リクエストフォーム (Change Request Form)**
// // - **サービスレポート (Service Report)**

// // ### 会議やコミュニケーション関連（多:N）
// // - **会議記録 (Meeting Notes)**

// // これらのドキュメントは、プロジェクトの異なるレベルやフェーズにおいて、それぞれ特定の目的や役割を持ちます。プロジェクト全体、システム、コンポーネント、機能、タスクなどの視点から、必要なドキュメントを作成し、管理することで、プロジェクトの効果的な進行と品質の保証が可能になります。

