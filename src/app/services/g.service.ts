import { Injectable } from '@angular/core';
import { User } from '../models/models';
import { Project } from '../models/project-model';

@Injectable({
  providedIn: 'root'
})
export class GService {
  info: { user: User } = { user: {} as User };
  projectModel?: Project;
  domainModel!: DomainModel;
  public queries: { [key: string]: string } = {};
  constructor() {
    //クエリパラメータを取得
    location.search.slice(1).split('&').forEach((query) => {
      const [key, value] = query.split('=');
      this.queries[key] = value;
    });

  }
}

export class Info {

}

// class Aclass {
//   constructor(
//     public name: string,
//     public age: number,
//   ) {
//   }
// }

// class Project {
//   name: string;
//   stages: DevelopmentStage[];
//   status: ProjectStatus;

//   constructor(name: string) {
//     this.name = name;
//     this.stages = [];
//     this.status = ProjectStatus.NotStarted;
//   }

//   addStage(stage: DevelopmentStage): void {
//     this.stages.push(stage);
//   }

//   updateStatus(status: ProjectStatus): void {
//     this.status = status;
//   }
// }


// class DevelopmentStage {
//   constructor(
//     public name: string,                   // 名前
//     public documents: Document[] = [],     // ドキュメント
//     public discussions: Discussion[] = [], // 議論
//     public tasks: Task[] = [],       // サブタスク
//     public status: ProjectStatus = ProjectStatus.NotStarted, // ステータス
//   ) {
//   }

//   addDocument(document: Document): void {
//     this.documents.push(document);
//   }

//   addDiscussion(discussion: Discussion): void {
//     this.discussions.push(discussion);
//   }

//   getDocuments(): Document[] {
//     return this.documents;
//   }

//   getDiscussions(): Discussion[] {
//     return this.discussions;
//   }
// }
// class Task {
//   name: string;
//   documents: Document[] = [];
//   discussions: Discussion[] = [];
//   public status: ProjectStatus = ProjectStatus.NotStarted; // ステータス

//   constructor(name: string) {
//     this.name = name;
//   }
//   markCompleted(): void {
//     this.status = ProjectStatus.Completed; // ステータス
//   }
// }

// class RequirementAnalysis extends DevelopmentStage {
//   constructor() {
//     super('Requirement Analysis');
//   }
// }

// class Design extends DevelopmentStage {
//   constructor() {
//     super('Design');
//   }
// }

// class Implementation extends DevelopmentStage {
//   constructor() {
//     super('Implementation');
//   }
// }

// class Testing extends DevelopmentStage {
//   constructor() {
//     super('Testing');
//   }
// }

// class Deployment extends DevelopmentStage {
//   constructor() {
//     super('Deployment');
//   }
// }

// class Maintenance extends DevelopmentStage {
//   constructor() {
//     super('Maintenance');
//   }
// }

// class ProjectManagement extends DevelopmentStage {
//   constructor() {
//     super('Project Management');
//   }
// }

// class Document {
//   constructor(
//     public title: string,   // タイトル
//     public content: string, // 内容
//   ) {
//   }
// }

// class Discussion {

//   constructor(
//     public topic: string,           // 議題
//     public participants: string[],  // 参加者
//     public messages: string[] = [], // メッセージ
//   ) {
//   }

//   addMessage(message: string): void {
//     this.messages.push(message);
//   }
// }


// enum ProjectStatus {
//   NotStarted = '未開始',
//   InProgress = '進行中',
//   OnHold = '中断',
//   Completed = '完了',
//   Cancelled = '中止',
//   PendingReview = 'レビュー待ち'
// }

export interface DomainModel {
  uid: string;
  sid: string;
  id: number
  name: string;
  description: string;
  thumbnailUrl: string;
  type: string;
  planModel: PlanModel[];
}
export interface PlanModel {
  id: number
  name: string;
  description: string;
  features: FeatureDescriptionModel[];
}

export interface FeatureDescriptionModel {
  id: number
  name: string;
  description: string;
  detials: FeatureDetailModel[];
}

export interface FeatureDetailModel {
  id: number
  name: string;
  description: string;
  detials: string[];
}

export interface RequirementsModel {
  id: number
  name: string;
  description: string;
}
