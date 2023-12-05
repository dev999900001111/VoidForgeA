import { Injectable } from '@angular/core';
import { Document, DocumentSubType, DocumentType, Project } from '../models/project-model';
import { GService } from './g.service';

@Injectable({
  providedIn: 'root'
})
export class FService {

  constructor(
    private g: GService,
  ) { }


  /**
   * 指定されたタイプのドキュメント全量を取得する。
   * @param project 
   * @param type 
   * @param subType 
   * @returns 
   */
  getProjectDocuments(project: Project, type?: DocumentType, subType?: DocumentSubType): Document[] {
    return project.stages.map(stage => stage.tasks.map(task => task.documents.filter(doc => (!type || doc.type === type) && (!subType || doc.subType === subType))).flat()).flat();
  }

  /**
   * 指定されたタイプのドキュメントの直近版のみを取得する。
   * @param project 
   * @param type 
   * @param subType 
   * @returns 
   */
  getLatestProjectDocument(project: Project, type?: DocumentType, subType?: DocumentSubType): Document {
    const documents = this.getProjectDocuments(project, type, subType);
    return documents[documents.length - 1];
  }
}
