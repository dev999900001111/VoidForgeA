import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppCommonModule } from 'src/app/app-common.module';
import { DevelopmentStageType, DocumentSubType, DocumentType, Project, ProjectStatus } from 'src/app/models/project-model';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [AppCommonModule],
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.scss'
})
export class CreateProjectDialogComponent {

  projectName = '';
  projectDescription = '';

  constructor(
    private dialogRef: MatDialogRef<CreateProjectDialogComponent>,
  ) { }

  registerProject(): void {
    const projectTemplate = JSON.parse(JSON.stringify(PROJECT_TEMPLATE['SystemDevelopment']));
    projectTemplate.name = this.projectName;
    projectTemplate.description = this.projectDescription;
    projectTemplate.label = this.projectName;
    this.dialogRef.close(projectTemplate);
  }
}
const PROJECT_TEMPLATE: { [key: string]: Project } = {
  SystemDevelopment: {
    id: -1, status: ProjectStatus.NotStarted, name: '', description: '', label: '',
    stages: [{
      id: -1, status: ProjectStatus.NotStarted,
      type: DevelopmentStageType.RequirementAnalysis,
      name: '0000-要件定義',
      tasks: [{
        id: -1, status: ProjectStatus.NotStarted, discussions: [],
        name: '0000-機能一覧（概要）',
        documents: [{
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.Requirements, subType: DocumentSubType.BusinessRequirements,
          title: '要件一覧',
        }, {
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.Requirements, subType: DocumentSubType.SystemRequirements,
          title: 'システム要件',
        }, {
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.Requirements, subType: DocumentSubType.FeatureListSummary,
          title: '機能一覧（概要）',
        }],
      },],
    }, {
      id: -1, status: ProjectStatus.NotStarted,
      type: DevelopmentStageType.Design,
      name: '0010-設計',
      tasks: [{
        id: -1, status: ProjectStatus.NotStarted, discussions: [],
        name: '0000-機能設計',
        documents: [{
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.DesignSpecifications, subType: DocumentSubType.FeatureListDetail,
          title: '機能一覧（詳細）',
          // }, { // 個別設計書なのでテンプレートには含めない
          //   id: -1, status: ProjectStatus.NotStarted, content: '',
          //   type: DocumentType.DesignSpecifications, subType: DocumentSubType.HighLevelDesign,
          //   title: '機能設計（上位）',
          // }, {
          //   id: -1, status: ProjectStatus.NotStarted, content: '',
          //   type: DocumentType.DesignSpecifications, subType: DocumentSubType.LowLevelDesign,
          //   title: '機能設計（下位）',
        }],
      }, {
        id: -1, status: ProjectStatus.NotStarted, discussions: [],
        name: '0050-画面設計',
        documents: [{
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.DesignSpecifications, subType: DocumentSubType.ScreenDesign,
          title: '画面設計',
        }, {
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.DesignSpecifications, subType: DocumentSubType.ScreenDesign,
          title: '画面一覧',
        }, {
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.DesignSpecifications, subType: DocumentSubType.ScreenTransitionDiagram,
          title: '画面遷移図',
        }],
      }, {
        id: -1, status: ProjectStatus.NotStarted, discussions: [],
        name: '0100-DB設計',
        documents: [{
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.DesignSpecifications, subType: DocumentSubType.DatabaseDesign,
          title: 'DB設計',
        }, {
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.DesignSpecifications, subType: DocumentSubType.DatabaseDesign,
          title: 'DBオブジェクト一覧',
        }],
      }, {
        id: -1, status: ProjectStatus.NotStarted, discussions: [],
        name: '0150-API設計',
        documents: [{
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.DesignSpecifications, subType: DocumentSubType.ApiDocumentation,
          title: 'API設計',
        }, {
          id: -1, status: ProjectStatus.NotStarted, content: '',
          type: DocumentType.DesignSpecifications, subType: DocumentSubType.ApiDocumentation,
          title: 'API一覧',
        }],
      },],
    }],
  }
}