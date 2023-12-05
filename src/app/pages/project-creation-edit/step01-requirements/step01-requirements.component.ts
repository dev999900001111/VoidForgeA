import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ChatCompletionStreamInDto } from '../../../models/models';
import { AppCommonModule } from 'src/app/app-common.module';
import { SavePublishDialogComponent } from 'src/app/dialogs/save-publish-dialog/save-publish-dialog.component';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { Utils } from 'src/app/utils/utils';
import { Observable, buffer, catchError, delay, finalize, first, firstValueFrom, forkJoin, from, map, of, switchMap, tap, toArray } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { GService } from 'src/app/services/g.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModelService } from 'src/app/services/project-model.service';
import { DevelopmentStage, DevelopmentStageType, Document, DocumentSubType, DocumentType, Project, ProjectStatus, Task } from 'src/app/models/project-model';

/**
 * 機能一覧（概要）を作るコンポーネント
 * In プロジェクト名
 * Process プロジェクト名を ChatGPT に投げて 3つの「会話：機能一覧（概要）Markdown」を作る。
 * Process 「会話：機能一覧（概要）Markdown」を解析して機能ごとにチェックボックスを作る
 * Process チェックされた機能を元に「資料：機能一覧（概要）の JSON」を作る
 * Out 「資料：機能一覧（概要）の JSON」
 */
@Component({
    selector: 'app-step01-requirements',
    standalone: true,
    imports: [AppCommonModule, SavePublishDialogComponent, MarkdownModule],
    templateUrl: './step01-requirements.component.html',
    styleUrl: './step01-requirements.component.scss'
})
export class Step01RequirementsComponent {
    @ViewChildren('featureList') featureList!: QueryList<ElementRef<MarkdownComponent>>;
    @ViewChild('requirements') requirements!: ElementRef<MarkdownComponent>;
    chatResponses: { [key: string]: { status: number, text: string, featureList: { checked: boolean, specified: boolean, feature: string }[] } } = {};
    chatKeys: string[] = [];

    phase: 'before' | 'loaded' = 'before';

    // target project
    project!: Project;

    // target stage ここでは要件定義ステージ
    stage!: DevelopmentStage;

    // target task ここでは機能一覧（概要）を作るタスク
    task!: Task;

    // 作成するドキュメント ここでは機能一覧（概要）の決定版
    document?: Document;

    @Output() save = new EventEmitter<Project>();

    @ViewChild('savePublishDialog') savePublishDialog!: TemplateRef<any>;

    constructor(
        private projectModelService: ProjectModelService,
        private chatService: ChatService,
        private g: GService,
        private dialog: MatDialog,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(
            // idを元にプロジェクトを取得
            switchMap(params => this.projectModelService.loadProjectModel(params['id']))
        ).subscribe({
            next: (project) => {
                console.dir(project);

                // プロジェクトをセット
                this.project = project;

                // 要件定義ステージをセット
                this.stage = project.stages.find((stage) => stage.type === DevelopmentStageType.RequirementAnalysis) as DevelopmentStage;
                if (this.stage) { } else { throw new Error('Requirement analysis stage is not found'); }

                // 機能一覧（概要）タスクをセット
                this.task = this.stage.tasks.find((task) => task.name === '0000-機能一覧（概要）') as Task;
                if (this.task) { } else { throw new Error('Task is not found'); }

                // 最新の3つのチャットスレッドを取得
                // チャットスレッドからチャットの進捗状況を復元
                for (let statements of this.task.discussions.slice(-3).map(discussion => discussion.statements)) {
                    const discussionId = statements[0].discussion.id;
                    statements.filter((statement, index) => statement.speaker.startsWith('gpt-4-1106-preview')).forEach((statement) => {
                        this.chatResponses[discussionId + ''] = this.chatResponses[discussionId + ''] || { status: 0, text: '', featureList: [] };
                        this.chatResponses[discussionId + ''].text += statement.content;
                    });
                    const chatres = statements.find(statement => statement.speaker.startsWith('gpt-'));
                    this.chatResponses[discussionId + ''] = {
                        status: 1,
                        text: chatres?.content || '',
                        featureList: [],
                    }
                    this.chatKeys.push(discussionId + '');

                    const prompt = statements.find(statement => statement.speaker.startsWith('user'));

                    this.lastPrompt = prompt?.content || '';
                    setTimeout(() => this.loadFromMarkdown(), 1000);
                }

                // 保存してあるドキュメントを取得
                this.document = this.task.documents.filter((doc) => doc.subType === DocumentSubType.FeatureListSummary).pop();
                return project;

            },
            error: (error) => {
                console.error('Failed to get project:', error);
            }
        });
    }

    ngAfterViewInit(): void {
    }

    lastPrompt = '';
    submitPrompt(prompt: string) {
        // チャットスレッドを生成
        this.projectModelService.updateProject(this.project).pipe(
            switchMap((updatedProject) => {
                this.project = updatedProject;
                this.save.emit(updatedProject);
                // return this.saveProject();
                return of(updatedProject);
            }),
            switchMap((task) => {
                this.phase = 'before';
                this.chatKeys = [];
                return forkJoin([
                    this.genPlan(prompt),
                    this.genPlan(prompt),
                    this.genPlan(prompt),
                ]);
            }),
            map((next) => {
                console.dir(next);
                this.lastPrompt = prompt;
                this.loadFromMarkdown();
                return next;
            }),
        ).subscribe({
            error: (error) => {
                console.error('Failed to update project:', error);
            }
        });
    }

    loadFromMarkdown(): void {
        // markdownのDOMが生成されるのを待ってからphaseを変更
        setTimeout(() => {
            this.phase = 'loaded';
            if (this.featureList.toArray().length > 0) {
                this.chatKeys.forEach((key: string, caseIndex: number) => {
                    (this.featureList.toArray()[caseIndex] as any).element.nativeElement.querySelectorAll('ol>li').forEach((element: any, featureIndex: number) => {
                        const li = element as HTMLLIElement;
                        // チェックボックスの状態を保存
                        this.chatResponses[key].featureList.push({ checked: false, specified: false, feature: li.innerHTML });
                    });
                });
            } else {
                // まだmarkdownのDOMが生成されていない場合は、再度loadFromMarkdownを呼び出す
            }
        }, 10);
    }

    /**
     * チャットスレッドを生成する。
     * Observeはvoidにするとforkjoinが出来なくなるのでstringを返すようにする。
     * @param prompt 
     * @returns 
     */
    genPlan(prompt: string): Observable<string[]> {
        // チャットスレッド用のIDはただの連番にする。
        const clientId = this.chatKeys.length + '';
        // チャットスレッド用の初期化
        this.chatResponses[clientId] = { status: 0, text: '', featureList: [] };
        this.chatKeys.push(clientId);

        // 頭出し機能一覧を作るプロンプト
        const systemMessage = Utils.trimLines(`
                              システム開発のための要件定義を手伝ってください。
                              与えられたお題目に対して、まずは機能の頭出しをしたいです。
                              markdownの番号リスト形式で機能一覧を列挙してください。
                              出力は機能一覧のみとし、余計なことは書かないでください。
                          `);
        const reqDto: ChatCompletionStreamInDto = {
            args: {
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: prompt },
                ],
                model: 'gpt-4-1106-preview',
                temperature: 1.0,
            }
        };
        return this.chatService.chatCompletionObservableStream2(reqDto, this.task.id).pipe(
            // チャットの進捗状況を保存
            tap((text) => this.chatResponses[clientId].text += text),
            toArray(),
            finalize(() => {
                console.log(`complete ${clientId}`);
                this.chatResponses[clientId].status = 1;
            }),
        );
    }

    selectedCaseIndex: number = -1;
    selectCase(chatKey: string): void {
        // 他のチェックボックスの状態を確認。全部がチェックされているかどうかを判定
        const isUnchecked = (this.chatResponses[this.chatKeys[this.selectedCaseIndex]] || { featureList: [] }).featureList.find((feature) => !feature.checked);

        // チェックボックスの状態を更新
        Object.keys(this.chatResponses).forEach((key: string) => {
            this.chatResponses[key].featureList.forEach((feature, featureIndex) => {
                // 現在選択状態のものを選択した場合、
                if (key === chatKey && chatKey === this.chatKeys[this.selectedCaseIndex]) {
                    // 全部チェックONの場合は、チェックをOFFにする
                    feature.checked = isUnchecked ? true : false;
                } else {
                    // それ以外の場合は新たにチェックされたものを全部ON、それ以外を全部OFFにする
                    feature.checked = key === chatKey;
                }
            });
        });

        // 選択インデックスを更新
        this.selectedCaseIndex = this.chatKeys.indexOf(chatKey);

        // 強調表示の状態を保存
        Object.keys(this.chatResponses).forEach((key: string) => {
            this.chatResponses[key].featureList.forEach((feature, featureIndex) => {
                if (key === chatKey) {
                    // 選択中のプランの場合は、強調表示をOFFにする
                    feature.specified = false;
                } else {
                    // 選択中のプラン以外の場合は、選択中プランに同じfeatureがあるかどうかで強調表示をON/OFFする
                    feature.specified = !this.chatResponses[chatKey].featureList.find((f) => f.feature === feature.feature);
                }
            });
        });
    }

    /**
     * 選択状態から機能一覧（概要）を作成する。
     */
    submit(skip: boolean = false): void {
        if (skip) {
            // 次へボタンが押された場合は、機能一覧（概要）を作成せずに次の画面に遷移する
            this.router.navigate([`../../step02-feature/${this.project.id}`], { relativeTo: this.activatedRoute });
            return;
        } else {
            // 機能一覧（概要）を作成する
        }
        if (this.selectedCaseIndex < 0) {
            alert('プランを選択してください。');
            return;
        }
        // 選択済み機能一覧を取得
        const features = this.chatResponses[this.chatKeys[this.selectedCaseIndex]].featureList.filter((feature) => feature.checked).map((feature) => feature.feature);
        Object.keys(this.chatResponses).filter(key => key !== this.chatKeys[this.selectedCaseIndex]).forEach((key: string) => {
            features.push(...this.chatResponses[key].featureList.filter((feature) => feature.checked).map((feature) => feature.feature));
        });
        // 機能一覧を追加
        const document = {
            id: -1,
            type: DocumentType.Requirements,
            subType: DocumentSubType.FeatureListSummary,
            title: '機能一覧（概要）',
            content: JSON.stringify(features),
            status: ProjectStatus.NotStarted,
        };
        this.projectModelService.addDocuments(this.task.id, [document]).subscribe({
            next: (addedDocuments) => {
                this.document = addedDocuments[0];
                // 全量再取得は重いので手元オブジェクトを手動で更新しておく。
                this.task.documents.push(addedDocuments[0]);
                this.router.navigate([`../../step02-feature/${this.project.id}`], { relativeTo: this.activatedRoute });
            },
            error: (error) => { console.error('Failed to add document:', error); }
        });
    }
}
