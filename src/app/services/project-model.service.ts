import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { DevelopmentStage, Discussion, Document, Project, Statement, Task } from '../models/project-model';
import { safeForkJoin } from '../utils/dom-utils';
import { GService } from './g.service';

@Injectable({ providedIn: 'root' })
export class ProjectModelService {

  private apiUrl = `/user`; // Replace with actual API base URL

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private g: GService,
  ) {
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /**
   * 画面から利用する便利メソッド
   * @param id 
   * @returns 
   */
  loadProjectModel(id: string | undefined): Observable<Project> {
    // パスパラメータ
    if (id) {
      if (this.g.projectModel && Number(id) == this.g.projectModel.id) {
        // 既存のプロジェクトモデルを返す
        return of(this.g.projectModel);
      } else {
        return this.getProjectDeep(Number(id)).pipe(
          tap(project => {
            this.g.projectModel = project;
          }),
        );
      }
    } else {
      // パスパラメータにプロジェクトIDがない場合はエラー
      throw new Error('Project ID is not specified');
    }
  }


  // プロジェクト系
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/project/`, project, { headers: this.getHeaders() });
  }
  getProjectList(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project-list/`, { headers: this.getHeaders() }).pipe(
      map(projects => (projects || []).sort((a, b) => a.id - b.id)),
    );
  }
  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/project/${id}`, { headers: this.getHeaders() });
  }
  updateProject(project: Project): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/project/${project.id}`, project, { headers: this.getHeaders() });
  }
  deleteProject(id: number): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/project/${id}`, { headers: this.getHeaders() });
  }

  createProjectDeep(project: Project): Observable<Project> {
    return this.createProject(project).pipe(
      switchMap(_project => {
        // projectを受け取ってstageListを作成する。
        project.id = _project.id;
        return this.addDevelopmentStagesDeep(project.id, project.stages);
      }),
      map(stages => project),
    );
  }
  getProjectDeep(id: number): Observable<Project> {
    let project: Project;
    return this.getProject(id).pipe(
      switchMap(_project => {
        project = _project;
        // projectを受け取ってstageListを取得する。
        return this.getDevelopmentStageList(project.id);
      }),
      switchMap(stages => {
        // stageListを受け取ってtaskListを取得する。
        return safeForkJoin((stages || []).map(stage => this.getDevelopmentStageDeep(stage.id))).pipe(
          tap(stages => {
            project.stages = stages || [];
          }));
      }),
      map(() => project),
    );
  }
  updateProjectDeep(project: Project): Observable<Project> {
    return this.updateProject(project).pipe(
      switchMap(_project => {
        project = _project;
        // projectを受け取ってstageListを作成する。
        return safeForkJoin(project.stages.map(stage => this.updateDevelopmentStageDeep(stage)));
      }),
      map(() => project),
    );
  }
  // deleteProjectDeep(id: number): Observable<Project> {
  //     let project: Project;
  //     return this.deleteProject(id).pipe(
  //         switchMap(_project => {
  //             project = _project;
  //             project.stages = project.stages || [];
  //             // projectを受け取ってstageListを作成する。
  //             return safeForkJoin(_project.stages.map(stage => this.deleteDevelopmentStageDeep(stage.id)));
  //         }),
  //         map(() => project),
  //     );
  // }

  // ステージ系
  addDevelopmentStages(projectId: number, stages: DevelopmentStage[]): Observable<DevelopmentStage[]> {
    return this.http.post<DevelopmentStage[]>(`${this.apiUrl}/project/${projectId}/development-stages`, { stages }, { headers: this.getHeaders() }).pipe(
      map(stages => (stages || []).sort((a, b) => a.id - b.id)),
    );;
  }
  getDevelopmentStageList(projectId: number): Observable<DevelopmentStage[]> {
    return this.http.get<DevelopmentStage[]>(`${this.apiUrl}/project/${projectId}/development-stage-list`, { headers: this.getHeaders() }).pipe(
      map(stages => (stages || []).sort((a, b) => a.id - b.id)),
    );
  }
  getDevelopmentStage(id: number): Observable<DevelopmentStage> {
    return this.http.get<DevelopmentStage>(`${this.apiUrl}/development-stage/${id}`, { headers: this.getHeaders() });
  }
  updateDevelopmentStage(stage: DevelopmentStage): Observable<DevelopmentStage> {
    return this.http.patch<DevelopmentStage>(`${this.apiUrl}/development-stage/${stage.id}`, stage, { headers: this.getHeaders() });
  }
  deleteDevelopmentStage(id: number): Observable<DevelopmentStage> {
    return this.http.delete<DevelopmentStage>(`${this.apiUrl}/development-stage/${id}`, { headers: this.getHeaders() });
  }

  addDevelopmentStagesDeep(projectId: number, stages: DevelopmentStage[]): Observable<DevelopmentStage[]> {
    return this.addDevelopmentStages(projectId, stages).pipe(
      switchMap(_stages => {
        // stageを受け取ってtaskListを作成する。
        return safeForkJoin(_stages.map((stage, index) => {
          stages[index].id = stage.id;
          return this.addTasksDeep(stages[index].id, stages[index].tasks);
        }));
      }),
      map((tasks) => stages.sort((a, b) => a.id - b.id)),
    );
  }
  getDevelopmentStageDeep(id: number): Observable<DevelopmentStage> {
    let stage: DevelopmentStage;
    return this.getDevelopmentStage(id).pipe(
      switchMap(_stage => {
        stage = _stage;
        stage.tasks = stage.tasks || [];
        // stageを受け取ってtaskListを取得する。
        return safeForkJoin(stage.tasks.map(task => this.getTaskDeep(task.id)));
      }),
      tap(tasks => {
        // taskListを受け取ってstageを返す。
        stage.tasks = tasks || [];
      }),
      map(() => stage),
    );
  }
  updateDevelopmentStageDeep(stage: DevelopmentStage): Observable<DevelopmentStage> {
    return this.updateDevelopmentStage(stage).pipe(
      switchMap(_stage => {
        stage = _stage;
        // stageを受け取ってtaskListを作成する。
        return safeForkJoin(stage.tasks.map(task => this.updateTaskDeep(task)));
      }),
      map(() => stage),
    );
  }
  deleteDevelopmentStageDeep(id: number): Observable<DevelopmentStage> {
    let stage: DevelopmentStage;
    return this.deleteDevelopmentStage(id).pipe(
      switchMap(_stage => {
        stage = _stage;
        // stageを受け取ってtaskListを作成する。
        return safeForkJoin(stage.tasks.map(task => this.deleteTaskDeep(task.id)));
      }),
      map(() => stage),
    );
  }

  // タスク系
  addTasks(stageId: number, tasks: Task[]): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.apiUrl}/development-stage/${stageId}/tasks`, { tasks }, { headers: this.getHeaders() }).pipe(
      map(tasks => (tasks || []).sort((a, b) => a.id - b.id)),
    );
  }
  getTaskList(stageId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/development-stage/${stageId}/task-list`, { headers: this.getHeaders() }).pipe(
      map(tasks => (tasks || []).sort((a, b) => a.id - b.id)),
    );
  }
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/task/${id}`, { headers: this.getHeaders() });
  }
  updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/task/${task.id}`, task, { headers: this.getHeaders() });
  }
  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/task/${id}`, { headers: this.getHeaders() });
  }

  addTasksDeep(stageId: number, tasks: Task[]): Observable<Task[]> {
    // console.log(`addTaskDeep ${stageId}`);
    return this.addTasks(stageId, tasks).pipe(
      switchMap(_tasks => {
        return safeForkJoin(_tasks.map((task, index) => {
          tasks[index].id = task.id;
          // taskを受け取ってdocumentListとdiscussionListを作成する。
          return safeForkJoin([
            this.addDocuments(task.id, tasks[index].documents),
            this.addDiscussionsDeep(task.id, tasks[index].discussions),
          ]);
        }));
      }),
      tap(documentsAndDiscussions => {
        // documentListとdiscussionListを受け取ってtaskを返す。
        documentsAndDiscussions.forEach((documentsAndDiscussion, index) => {
          // tasks[index].documents = tasks[index].documents || [];
          // documentsAndDiscussion[0].forEach((document, _index) => {
          //     tasks[index].documents[_index].id = document.id;
          // });
          tasks[index].discussions = tasks[index].discussions || [];
          // documentsAndDiscussion[1].forEach((discussion, _index) => {
          //     tasks[index].discussions[_index].id = discussion.id;
          // });
        });
      }),
      map((documentsAndDiscussions) => tasks.sort((a, b) => a.id - b.id)),
    );
  }
  getTaskDeep(id: number): Observable<Task> {
    let task: Task;
    return this.getTask(id).pipe(
      switchMap(_task => {
        task = _task;
        task.documents = task.documents || [];
        task.discussions = task.discussions || [];
        // taskを受け取ってdocumentListとdiscussionListを取得する。
        return forkJoin([
          safeForkJoin(task.documents.map(document => this.getDocument(document.id))),
          safeForkJoin(task.discussions.map(discussion => this.getDiscussionDeep(discussion.id)))
        ]);
      }),
      tap(documentsAndDiscussions => {
        // documentListとdiscussionListを受け取ってtaskを返す。
        task.documents = documentsAndDiscussions[0] || [];
        task.discussions = documentsAndDiscussions[1] || [];
      }),
      map(() => task),
    );
  }
  updateTaskDeep(task: Task): Observable<Task> {
    return this.updateTask(task).pipe(
      switchMap(_task => {
        task = _task;
        // taskを受け取ってdocumentListとdiscussionListを作成する。
        return safeForkJoin([
          safeForkJoin(task.documents.map(document => this.updateDocument(document))),
          safeForkJoin(task.discussions.map(discussion => this.updateDiscussionDeep(discussion))),
        ]);
      }),
      tap(documentsAndDiscussions => {
        // documentListとdiscussionListを受け取ってtaskを返す。
        task.documents = documentsAndDiscussions[0] || [];
        task.discussions = documentsAndDiscussions[1] || [];
      }),
      map(() => task),
    );
  }
  deleteTaskDeep(id: number): Observable<Task> {
    let task: Task;
    return this.deleteTask(id).pipe(
      switchMap(_task => {
        task = _task;
        // taskを受け取ってdocumentListとdiscussionListを作成する。
        return safeForkJoin([
          safeForkJoin(task.documents.map(document => this.deleteDocument(document.id))),
          safeForkJoin(task.discussions.map(discussion => this.deleteDiscussionDeep(discussion.id))),
        ]);
      }),
      map(() => task),
    );
  }

  // ドキュメント系
  addDocuments(taskId: number, documents: Document[]): Observable<Document[]> {
    return this.http.post<Document[]>(`${this.apiUrl}/task/${taskId}/documents`, { documents }, { headers: this.getHeaders() }).pipe(
      map(documents => (documents || []).sort((a, b) => a.id - b.id)),
    );
  }
  getDocumentList(taskId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/task/${taskId}/document-list`, { headers: this.getHeaders() }).pipe(
      map(documents => (documents || []).sort((a, b) => a.id - b.id)),
    );
  }
  getDocument(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/document/${id}`, { headers: this.getHeaders() });
  }
  updateDocument(document: Document): Observable<Document> {
    return this.http.patch<Document>(`${this.apiUrl}/document/${document.id}`, document, { headers: this.getHeaders() });
  }
  deleteDocument(id: number): Observable<Document> {
    return this.http.delete<Document>(`${this.apiUrl}/document/${id}`, { headers: this.getHeaders() });
  }

  // 議事録系
  addDiscussions(taskId: number, discussions: Discussion[]): Observable<Discussion[]> {
    return this.http.post<Discussion[]>(`${this.apiUrl}/task/${taskId}/discussions`, { discussions }, { headers: this.getHeaders() }).pipe(
      map(discussions => (discussions || []).sort((a, b) => a.id - b.id)),
    );
  }
  getDiscussionList(taskId: number): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/task/${taskId}/discussion-list`, { headers: this.getHeaders() }).pipe(
      map(discussions => (discussions || []).sort((a, b) => a.id - b.id)),
    );
  }
  getDiscussion(id: number): Observable<Discussion> {
    return this.http.get<Discussion>(`${this.apiUrl}/discussion/${id}`, { headers: this.getHeaders() });
  }
  updateDiscussion(discussion: Discussion): Observable<Discussion> {
    return this.http.patch<Discussion>(`${this.apiUrl}/discussion/${discussion.id}`, discussion, { headers: this.getHeaders() });
  }
  deleteDiscussion(id: number): Observable<Discussion> {
    return this.http.delete<Discussion>(`${this.apiUrl}/discussion/${id}`, { headers: this.getHeaders() });
  }

  addDiscussionsDeep(taskId: number, discussions: Discussion[]): Observable<Discussion[]> {
    return this.addDiscussions(taskId, discussions).pipe(
      switchMap(_discussions => {
        // discussionを受け取ってstatementListを作成する。
        return safeForkJoin(_discussions.map((discussion, index) => {
          discussions[index].id = discussion.id;
          return this.addStatements(discussion.id, discussions[index].statements);
        }));
      }),
      tap(statements => {
        // statementListを受け取ってdiscussionを返す。
        statements.forEach((statement, index) => {
          discussions[index].statements = discussions[index].statements || [];
          discussions[index].statements.forEach((statement, _index) => {
            discussions[index].statements[_index].id = statement.id;
          });
        });
      }),
      map(statements => discussions.sort((a, b) => a.id - b.id)),
    );
  }

  getDiscussionDeep(id: number): Observable<Discussion> {
    let discussion: Discussion;
    return this.getDiscussion(id).pipe(
      switchMap(_discussion => {
        discussion = _discussion;
        // discussionを受け取ってstatementListを取得する。
        return this.getStatementList(discussion.id);
      }),
      tap(statements => {
        // statementListを受け取ってdiscussionを返す。
        discussion.statements = statements || [];
      }),
      map(statements => discussion),
    );
  }

  updateDiscussionDeep(discussion: Discussion): Observable<Discussion> {
    return this.updateDiscussion(discussion).pipe(
      switchMap(_discussion => {
        discussion = _discussion;
        // discussionを受け取ってstatementListを作成する。
        return safeForkJoin(discussion.statements.map(statement => this.updateStatement(statement)));
      }),
      tap(statements => {
        // statementListを受け取ってdiscussionを返す。
        discussion.statements = statements || [];
      }),
      map(statements => discussion),
    );
  }

  deleteDiscussionDeep(id: number): Observable<Discussion> {
    let discussion: Discussion;
    return this.deleteDiscussion(id).pipe(
      switchMap(_discussion => {
        discussion = _discussion;
        // discussionを受け取ってstatementListを作成する。
        return safeForkJoin(_discussion.statements.map(statement => this.deleteStatement(statement.id)));
      }),
      map(statements => discussion),
    );
  }

  // 発言系
  addStatements(discussionId: number, statements: Statement[]): Observable<Statement[]> {
    return this.http.post<Statement[]>(`${this.apiUrl}/discussion/${discussionId}/statements`, { statements }, { headers: this.getHeaders() }).pipe(
      map(statements => (statements || []).sort((a, b) => a.id - b.id)),
    );
  }
  getStatementList(discussionId: number): Observable<Statement[]> {
    return this.http.get<Statement[]>(`${this.apiUrl}/discussion/${discussionId}/statement-list`, { headers: this.getHeaders() }).pipe(
      map(statements => (statements || []).sort((a, b) => a.id - b.id)),
    );
  }
  getStatement(id: number): Observable<Statement> {
    return this.http.get<Statement>(`${this.apiUrl}/statement/${id}`, { headers: this.getHeaders() });
  }
  updateStatement(statement: Statement): Observable<Statement> {
    return this.http.patch<Statement>(`${this.apiUrl}/statement/${statement.id}`, statement, { headers: this.getHeaders() });
  }
  deleteStatement(id: number): Observable<Statement> {
    return this.http.delete<Statement>(`${this.apiUrl}/statement/${id}`, { headers: this.getHeaders() });
  }
}
