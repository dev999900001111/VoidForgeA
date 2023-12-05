import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { AppCommonModule } from 'src/app/app-common.module';
import { ChatCompletionStreamInDto } from 'src/app/models/models';
import { DevelopmentStage, DevelopmentStageType, Document, DocumentSubType, Project, Task } from 'src/app/models/project-model';
import { ChatService } from 'src/app/services/chat.service';
import { GService } from 'src/app/services/g.service';
import { ProjectModelService } from 'src/app/services/project-model.service';
import { DomUtils } from 'src/app/utils/dom-utils';
import { Utils } from 'src/app/utils/utils';


/**
 * 機能設計（個別）を作るコンポーネント
 * In 「資料：機能一覧（詳細）JSON」
 * Process 「資料：機能一覧（詳細）JSON」を1個ずつChatGPTに投げて「会話：機能設計（個別）Markdown」を作る
 * Process 「会話：機能設計（個別）Markdown」をサマってChatGPTに投げて「会話：機能設計（全体：画面/API/DB）JSON」を作る
 * Process 「会話：機能一覧（詳細）Markdown」を解析して「資料：機能一覧（詳細）JSON」 を作る
 * Out 機能一覧（詳細）のJSON
 */
@Component({
  selector: 'app-step03-feature-detail',
  standalone: true,
  imports: [AppCommonModule, MarkdownModule],
  templateUrl: './step03-feature-detail.component.html',
  styleUrl: './step03-feature-detail.component.scss'
})
export class Step03FeatureDetailComponent implements OnInit {

  @ViewChildren('textBodyElem') textBodyElem!: QueryList<ElementRef<HTMLDivElement>>;
  chatResponses: { [key: string]: { status: number, text: string, featureList: { checked: boolean, specified: boolean, feature: string }[] } } = {};
  chatKeys: string[] = [];

  loaded = false;


  // target project
  project!: Project;

  // 設計ステージ
  designStage!: DevelopmentStage;

  // 前回工程（機能一覧（詳細））のタスク
  featureDetailListTask!: Task;

  // 前回工程（機能一覧（詳細））のドキュメント
  featureDetailListDocument!: Document;

  // 今回工程は機能一覧（詳細）をマークダウンで分割して作成するので、そのリスト
  detStage!: DevelopmentStage;

  // target task ここでは機能一覧（詳細）を作るタスク
  detTask!: Task;

  // target document ここでは機能一覧（詳細）を作るドキュメント
  detDocument!: Document;

  // 個別設計書
  individualDesignTask!:Task;

  featureDetailList!: { [key: string]: { name: string, detail: string[] } };

  constructor(
    private dialog: MatDialog,
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

        // 設計ステージをセット
        this.designStage = project.stages.find((stage) => stage.type === DevelopmentStageType.Design) as DevelopmentStage;
        if (this.designStage) { } else { throw new Error('Design stage is not found'); }

        // 機能一覧（詳細）タスクをセット
        this.detTask = this.designStage.tasks.find((task) => task.name === '0000-機能設計') as Task;
        if (this.detTask) { } else { throw new Error('Task is not found'); }

        // 機能一覧（詳細）ドキュメントをセット
        this.detDocument = this.detTask.documents.filter((doc) => doc.subType === DocumentSubType.FeatureListDetail).pop() as Document;

        this.featureDetailList = JSON.parse(this.detDocument.content) as { [key: string]: { name: string, detail: string[] } };
        console.dir(this.featureDetailList);


        this.individualDesignTask = this.designStage.tasks.find((task) => task.name === '0000-個別設計') as Task;

        // // 前工程の結果を反映
        // this.features = this.sumDocument.content;

        // // 前回文書作成時のチャットスレッドがある場合は、その内容を表示
        // this.chatResponse.text = this.detDocument.content;

        // this.isLoading = false;

        this.loaded = true;
      },
      error: (error) => {
        console.error('Failed to get project:', error);
      }
    });
  }

  view(chatKey: string): void {
    // this.dialog.open(Step03FeatureDetailDialogComponent, { data: this.chatResponses[chatKey].text });
  }

  submit(): void {
    const resList: Observable<string>[] = [];
    Object.keys(this.featureDetailList).forEach((key, index: number) => {
      if (index <= 2) {
        resList.push(this.genPlan('# 全体設計書\n\n' + this.featureDetailList[key], key, index));
      } else {
      }
    });
    forkJoin(resList).subscribe({
      next: (next) => {
        console.log(next); // ここでチャットの結果を表示
      },
      complete: () => {
        this.procAll().subscribe({
          next: (next) => {
            console.log(next);
          },
          complete: () => {
          }
        });
      }
    });
  }

  /**
   * チャットスレッドを生成する。
   * Observeはvoidにするとforkjoinが出来なくなるのでstringを返すようにする。
   * @param prompt 
   * @returns 
   */
  genPlan(prompt: string, featureName: string, featureIndex: number): Observable<string> {
    // チャットスレッド用のIDはただの連番にする。
    const clientId = this.chatKeys.length + '';
    // チャットスレッド用の初期化
    this.chatResponses[clientId] = { status: 0, text: '', featureList: [] };
    this.chatKeys.push(clientId);

    // 頭出し機能一覧を作るプロンプト
    const systemMessage = Utils.trimLines(`
                            与えられた全体設計書を元に機能要件のさらなる詳細・具体化をしてください。
                            あなたが担当する箇所は ** ${featureName} ** です。
                            正常系の要件だけでなく、異常系の要件も考えてください。
                            全てのパターンについて考慮漏れがないように、ステップバイステップでしっかりと考えてください。
                            テストシナリオや技術要素の選定は別のチームで行うため、言及しないでください。

                            以下に** 待ちリスト管理機能 **の詳細・具体化のサンプルを提示します。
                            文書形式はなるべくサンプルと同じになるようにして下さい。
                            ---
                            # 待ちリスト管理機能

                            ## 正常系の要件
                            
                            ### 待ちリストへの登録
                            1. 患者が予約したい日時が満席の場合、待ちリストに登録するオプションを提供する。
                            2. 待ちリストに登録する際、患者は連絡先情報（電話番号とメールアドレス）を提供する必要がある。
                            3. 登録が完了すると、患者に待ちリスト登録確認の通知を送信する。
                            
                            ### 空き情報の通知
                            1. キャンセルが発生した場合、システムは待ちリストの先頭にいる患者に自動で通知する。
                            2. 通知はメールとSMSの両方で送信し、予約可能な日時と予約方法を案内する。
                            3. 通知を受けた患者は指定された時間内（例：2時間以内）に予約を行う必要がある。
                            
                            ### 予約の確定
                            1. 待ちリストからの予約が成立した場合、その患者は待ちリストから削除される。
                            2. 予約確定後、患者に予約確定通知を送信する。
                            3. 待ちリストに残っている患者は、順番が繰り上がる。
                            
                            ## 異常系の要件
                            
                            ### 通知の失敗
                            1. 通知送信時にエラーが発生した場合（例：メールアドレスが無効、SMS送信エラー）、システムは再試行を行う。
                            2. 一定回数（例：3回）再試行しても失敗する場合、その患者は待ちリストから除外し、次の患者に通知を試みる。
                            
                            ### 予約未確定
                            1. 通知を受けた患者が指定された時間内に予約を行わなかった場合、その患者は待ちリストから除外される。
                            2. 次の患者に自動で通知が行われる。
                            
                            ### 待ちリストのキャンセル
                            1. 患者は待ちリストから自分を削除することができる。
                            2. 削除操作を行うと、患者に待ちリスト削除確認の通知を送信する。
                            
                            ### 待ちリストの上限
                            1. 待ちリストには上限を設ける（例：20人まで）。
                            2. 上限に達した場合、新たな患者は待ちリストに登録できないことを通知する。
                            
                            ### データ整合性
                            1. システムは待ちリストのデータ整合性を維持するため、定期的に検証を行う。
                            2. 不整合が発見された場合は、手動での確認と修正を行う。
                            
                            ### プライバシー保護
                            1. 待ちリストに登録された患者の個人情報は、プライバシー保護のために適切に管理する。
                            2. 通知以外の目的で患者の連絡先情報を使用しない。
                            
                            ## その他の考慮事項
                            
                            ### 時間帯の考慮
                            1. 通知は患者が受け取りやすい時間帯に送信するようにスケジュールする（例：夜間の通知を避ける）。
                            
                            ### 待ちリストの優先順位
                            1. 特定の条件（例：緊急性が高い患者）に基づいて、待ちリスト内での優先順位を設定することができる。
                            
                            ### 通知のカスタマイズ
                            1. 患者は通知の受け取り方法（メールのみ、SMSのみ、両方）を選択できるようにする。
                          `);
    console.log(systemMessage);
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
    return new Observable<string>((observer) => {
      this.chatService.chatCompletionObservableStream2(reqDto, this.featureDetailListTask.id).subscribe({
        // チャットの進捗状況を保存
        next: text => {
          this.chatResponses[clientId].text += text;
          // スクローラを一番下に
          setTimeout(() => { DomUtils.scrollToBottomIfNeeded(this.textBodyElem.toArray()[featureIndex].nativeElement) }, 1);
        },
        error: error => console.error(error),
        complete: () => {
          console.log(`complete ${clientId}`);
          this.chatResponses[clientId].status = 1;
          observer.next(clientId);
          observer.complete();
        }
      });
    });
  }

  /**
   * チャットスレッドを生成する。
   * Observeはvoidにするとforkjoinが出来なくなるのでstringを返すようにする。
   * @param prompt 
   * @returns 
   */
  procAll(): Observable<string> {
    const sumall = Object.keys(this.chatResponses).map((key) => this.chatResponses[key].text).join('\n\n---\n\n');
    // チャットスレッド用のIDはただの連番にする。
    const clientId = this.chatKeys.length + '';
    // チャットスレッド用の初期化
    this.chatResponses[clientId] = { status: 0, text: '', featureList: [] };
    this.chatKeys.push(clientId);

    // 頭出し機能一覧を作るプロンプト
    const reqDto: ChatCompletionStreamInDto = {
      args: {
        messages: [
          { role: 'system', content: Utils.trimLines(`与えられた設計書群を良く読み込んで理解して、画面一覧、API一覧、DBのテーブル一覧を作成してください。`) },
          { role: 'user', content: sumall },
          {
            role: 'user', content: Utils.trimLines(`
              # output format
              以下のJSONで出力してください。
              {"screenList":[
                {"screenId":"画面名(semantic)","name":"画面の名前（日本語）","path":"画面のエンドポイント","desc":"説明","useApiList":["apId",,]}
              ],
              "apiList":[
                {"apiId":"APIのID(semantic)","name":"APIの名前（日本語）","path":"APIのエンドポイント","desc":"説明","useTableList":["tableId",,,]}
                {APIのエンドポイント}
              ],
              "tableList":[
                {"tableId":"DBテーブルのID(semantic)","name":"テーブルの名前（日本語）","desc":"説明"}
                {APIのエンドポイント}
              ],
            }
            `)
          },
        ],
        response_format: { type: 'json_object' },
        model: 'gpt-4-1106-preview',
        temperature: 0,
      }
    };
    return new Observable<string>((observer) => {
      this.chatService.chatCompletionObservableStream(reqDto).subscribe({
        // チャットの進捗状況を保存
        next: text => this.chatResponses[clientId].text += text,
        error: error => console.error(error),
        complete: () => {
          console.log(`complete ${clientId}`);
          this.chatResponses[clientId].status = 1;
          observer.next(clientId);
          observer.complete();
        }
      });
    });
  }
}
