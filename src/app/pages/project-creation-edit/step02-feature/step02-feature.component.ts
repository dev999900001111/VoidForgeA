import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FeatureDescriptionModel, FeatureDetailModel, GService } from 'src/app/services/g.service';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { AppCommonModule } from 'src/app/app-common.module';
import { ChatService } from 'src/app/services/chat.service';
import { Utils } from 'src/app/utils/utils';
import { ChatCompletionStreamInDto } from 'src/app/models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { DevelopmentStage, DevelopmentStageType, Discussion, Document, DocumentSubType, Project, Statement, Task } from 'src/app/models/project-model';
import { ProjectModelService } from 'src/app/services/project-model.service';
import { switchMap } from 'rxjs';

/**
 * 機能一覧（詳細）を作るコンポーネント
 * In 「資料：機能一覧（概要）JSON」
 * Process 「資料：機能一覧（概要）JSON」の JSON を整形して「会話：機能一覧（概要）Markdown」にする。画面に表示して手で編集する。
 * Process 「会話：機能一覧（概要）Markdown」をChatGPTに投げて「会話：機能一覧（詳細）Markdown」を作る
 * Process 「会話：機能一覧（詳細）Markdown」を解析して「資料：機能一覧（詳細）JSON」 を作る
 * Out 機能一覧（詳細）のJSON
 */
@Component({
  selector: 'app-step02-feature',
  standalone: true,
  imports: [AppCommonModule, MarkdownModule],
  templateUrl: './step02-feature.component.html',
  styleUrl: './step02-feature.component.scss'
})
export class Step02FeatureComponent implements OnInit {

  isLoading = true;

  @ViewChild('featuresElem')
  featuresElem!: ElementRef<MarkdownComponent>;

  @ViewChild('detailList')
  detailList!: ElementRef<MarkdownComponent>;

  features!: string;

  // chatResponseの内容を手編集する用
  featureDetailList!: string;

  chatResponse: { status: number, text: string } = { status: 0, text: '' };

  isSumEdit = false;
  isDetEdit = false;

  // target project
  project!: Project;

  // target stage ここでは要件定義ステージ
  sumStage!: DevelopmentStage;

  // target task ここでは機能一覧（概要）を作るタスク
  sumTask!: Task;

  // target document ここでは機能一覧（概要）を作るドキュメント
  sumDocument!: Document;

  // ----詳細
  // target stage ここでは設計ステージ
  detStage!: DevelopmentStage;

  // target task ここでは機能一覧（詳細）を作るタスク
  detTask!: Task;

  // target document ここでは機能一覧（詳細）を作るドキュメント
  detDocument!: Document;

  constructor(
    private projectModelService: ProjectModelService,
    public g: GService,
    private chatService: ChatService,
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
        this.sumStage = project.stages.find((stage) => stage.type === DevelopmentStageType.RequirementAnalysis) as DevelopmentStage;
        if (this.sumStage) { } else { throw new Error('Requirement analysis stage is not found'); }

        // 設計ステージをセット
        this.detStage = project.stages.find((stage) => stage.type === DevelopmentStageType.Design) as DevelopmentStage;
        if (this.detStage) { } else { throw new Error('Design stage is not found'); }

        // 機能一覧（概要）タスクをセット
        this.sumTask = this.sumStage.tasks.find((task) => task.name === '0000-機能一覧（概要）') as Task;
        if (this.sumTask) { } else { throw new Error('Task is not found'); }

        // 機能一覧（詳細）タスクをセット
        this.detTask = this.detStage.tasks.find((task) => task.name === '0000-機能設計') as Task;
        if (this.detTask) { } else { throw new Error('Task is not found'); }

        // 機能一覧（概要）ドキュメントをセット
        this.sumDocument = this.sumTask.documents.filter((doc) => doc.subType === DocumentSubType.FeatureListSummary).pop() as Document;

        // 機能一覧（詳細）ドキュメントをセット
        this.detDocument = this.detTask.documents.filter((doc) => doc.subType === DocumentSubType.FeatureListDetail).pop() as Document;


        // TODO Input側に手編集入ったかどうかで分岐
        // 今はとりあえず前工程の内容を表示
        this.features = (JSON.parse(this.sumDocument.content) as string[]).map((feature, index) => `${index + 1}. ${feature}`).join('\n');


        // Output側に手編集入ったかどうかで分岐
        if (this.detTask.discussions && this.detTask.discussions.length) {
          const lastDiscussion = this.detTask.discussions[this.detTask.discussions.length - 1] as Discussion;
          const lastStatement = lastDiscussion.statements[lastDiscussion.statements.length - 1] as Statement;

          // 前回文書作成時のチャットスレッドがある場合は、その内容を表示
          this.chatResponse.text = lastStatement.content;
          this.featureDetailList = this.chatResponse.text;
        } else {
          this.chatResponse.text = '';
          this.featureDetailList = '';
        }
        console.log(this.features);

        this.isLoading = false;

        setTimeout(() => {
          this.textAreaSize.width = (this.featuresElem as any).element.nativeElement.offsetWidth;
          this.textAreaSize.height = (this.featuresElem as any).element.nativeElement.offsetHeight + 200;
          // console.log(((this.featuresElem as any).element.nativeElement as HTMLDivElement).scrollHeight);
        }, 100);
      },
      error: (error) => {
        console.error('Failed to get project:', error);
      }
    });
  }

  addFeature(): void {
  }

  submit(): void {
    const struct: { [key: string]: string[] } = {};
    const detailListHtml = (this.detailList as any).element.nativeElement as HTMLElement;

    // markdown解析：h1-4でリストの数が一番大きいものを採用
    const hListAll = ['h1', 'h2', 'h3', 'h4'].map((tagName) => detailListHtml.querySelectorAll(tagName));
    const hMax = Math.max(...hListAll.map((hList) => hList.length));
    const hList = hListAll.find((hList) => hList.length === hMax) as NodeListOf<HTMLHeadingElement>;

    hList.forEach((hElem) => {
      const feature = { name: hElem.innerText, detials: [] as string[] };
      struct[hElem.innerText] = [];
      const uList = hElem.nextElementSibling as HTMLUListElement;
      uList.querySelectorAll(`${uList.tagName}>*`).forEach((liElem) => {
        const description = (liElem as any).innerText;
        feature.detials.push(description);
        struct[hElem.innerText].push(description);
      });
    });

    // 
    this.detDocument.content = JSON.stringify(struct);
    this.projectModelService.addDocuments(this.detTask.id, [this.detDocument]).subscribe({
      next: (addedDocuments) => {
        // 全量再取得は重いので手元オブジェクトを手動で更新しておく。
        this.detDocument = addedDocuments[0];
        this.detTask.documents.push(addedDocuments[0]);
        console.log('Document updated');
        console.log(struct);
        this.router.navigate([`../project-creation-edit/step03-feature-detail/${this.project.id}`]);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Document updated complete');
      },
    });
  }

  textAreaSize: { width: number, height: number } = { width: 0, height: 0 };
  editFeatures(flg: boolean): void {
    this.isSumEdit = flg;
  }

  drilldown(): void {
    // 頭出し機能一覧を作るプロンプト
    const systemMessage = Utils.trimLines(`
        与えられた機能一覧を詳細化してください。

        出力フォーマットは以下の通りです。
        ----------------------------------------

        # 機能詳細化

        ## オンライン予約機能
        - 患者がインターネットを通じて24時間いつでも予約が可能。
        - 利用可能な予約枠がリアルタイムで表示され、選択して予約を行える。
        - 新規患者と既存患者の両方が利用できるようにする。
        - 予約時に必要な患者情報の入力フォームを提供。

        ## 自動リマインダー
        - 予約日時が近づくと、患者にEメールやSMSで自動的にリマインダーを送信。
        - リマインダーの通知時間をカスタマイズ可能にする。
      `);

    const prompt = Utils.trimLines(`
        # Introduction
        ${this.detDocument.title}
  
        # Features
        ${this.features}
      `);

    this.chatResponse.text = '';

    const reqDto: ChatCompletionStreamInDto = {
      args: {
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt },
        ],
        model: 'gpt-4-1106-preview',
        temperature: 0,
      }
    };

    this.chatService.chatCompletionObservableStream2(reqDto, this.detTask.id).subscribe({
      next: next => {
        this.chatResponse.text += next;
      },
      error: console.error,
      complete: () => {
        this.featureDetailList = this.chatResponse.text;
      }
    });
  }
}

