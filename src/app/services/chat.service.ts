import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, first } from 'rxjs';
import { ChatCompletionStreamInDto } from '../models/models';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Utils } from '../utils/utils';

/**
 * チャットサービス
 * ブラウザの同時コネクション数制限が6とかなので
 * イベントソースを毎回張るのではなくて1本にまとめる。
 * 
 * 認証情報はヘッダーに入れるため、new EventSource()ではなくXMLHttpRequestを使っている。
 */
@Injectable({ providedIn: 'root' })
export class ChatService {

  // private baseUrl = `${location.protocol}//${location.hostname}:3000`; // Replace with actual API base URL
  private baseUrl = `/user`;
  // private baseUrl = `${location.protocol}//${location.hostname}`; // Replace with actual API base URL
  // private baseUrl = `..`; // Replace with actual API base URL

  clientId!: string

  // データストリーム監視用のマップ
  subscriberMap: { [key: string]: Subscriber<string> } = {};

  // 作成したデータストリームのテキストを保持するマップ
  textMap: { [key: string]: string } = {};

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private open(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (Object.keys(this.subscriberMap).length > 1) {
        console.log('Already exists stream');
        observer.next(true);
        observer.complete();
      } else {
        const xhr = new XMLHttpRequest();
        // チャットスレッド用にUUIDを生成
        this.clientId = Utils.generateUUID();
        // ここはhttpclientを通さないからインターセプターが効かないので自分でパス設定する
        xhr.open('GET', `${environment.apiUrl}${this.baseUrl}/event?connectionId=${this.clientId}`, true);
        xhr.setRequestHeader('Accept', 'text/event-stream');
        xhr.setRequestHeader('Authorization', `Bearer ${this.authService.getToken()}`);
        let cursor = 0;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.OPENED) {
            // onopen のロジック
            console.log('Connected on open');
          } else if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
            // ヘッダー受信時のロジック
            console.log('Connected on headers received');
            observer.next(true);
            observer.complete();
          } else if (xhr.readyState === XMLHttpRequest.LOADING) {
            // データ受信中のロジック（onmessage）
            if (xhr.responseText.endsWith('\n\n')) {
              xhr.responseText.slice(cursor).split('\n').forEach((line) => {
                if (line.startsWith('data: ')) {
                  line = line.replace(/^data: /gm, '');
                  if (line.startsWith('{') && line.endsWith('}')) {
                    // json object 受信時
                    try {
                      const data = JSON.parse(line) as { data: { threadId: string, content: string } };
                      this.subscriberMap[data.data.threadId].next(data.data.content);
                      this.textMap[data.data.threadId] += data.data.content;
                    } catch (e) {
                      // json parse error. エラー吐いてとりあえず無視
                      console.log(line);
                      console.error(e);
                    }
                  } else if (line.startsWith('[DONE] ')) {
                    // 終了通知受信時
                    const threadId = line.split(' ')[1];

                    // ログ出力
                    console.log(this.textMap[threadId]);

                    // 終了通知
                    this.subscriberMap[threadId].complete();

                    // 監視オブジェクトを削除
                    delete this.subscriberMap[threadId];
                    // ストリームが存在しなくなったら、XHRを中断する
                    if (Object.keys(this.subscriberMap).length === 0) {
                      xhr.abort();
                      // チャットスレッド用にUUIDを生成
                      this.clientId = Utils.generateUUID();
                    } else {
                      // 何もしない
                    }
                  } else if (!line) {
                    // 空行の場合は無視
                  } else {
                    // その他のメッセージ受信時
                    console.log(line);
                  }
                } else if (line) {
                  // その他のメッセージ受信時
                  console.log(line);
                } else {
                  // 空行の場合は無視
                }
              });
              cursor = xhr.responseText.length;
            } else {
              // \n\n で終わっていない場合は読み取り途中のためカーソルをそのままにしておく
              console.log('not end with \\n\\n');
            }
          } else if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log('Connected on done');
            observer.next(true);
            observer.complete();
            // リクエスト完了時のロジック（onerror または oncomplete）
            Object.keys(this.subscriberMap).forEach((key) => {
              if (this.subscriberMap[key].closed) {
              } else {
                this.subscriberMap[key].error();
              }
            });
          } else {
            console.log('Connected on else');
          }
        };
        xhr.send();
      }
    }).pipe(first());
  }

  chatCompletionObservableStream(inDto: ChatCompletionStreamInDto): Observable<string> {
    return new Observable<string>((observer) => {
      // スレッド用にUUIDを生成
      const threadId = Utils.generateUUID();

      // 監視オブジェクトを登録
      this.subscriberMap[threadId] = observer;

      // EventSourceを開く
      this.open().subscribe((result) => {
        this.http.post(`${this.baseUrl}/chat-completion?connectionId=${this.clientId}&threadId=${threadId}`, inDto, { headers: this.authService.getHeaders() }).subscribe({
          next: (result) => {
            // Handle response
            // eventSourceのイベントハンドラで処理するので何もしない
          },
          error: (error) => {
            // Handle error
            console.error(error);
            observer.error();
          },
        });
      });
    });
  }

  /**
   * ただ投げるだけではなくて、タスクIDを指定して投げるので
   * ProjectModelのDiscussionに残る
   * @param inDto 
   * @param taskId 
   * @returns 
   */
  chatCompletionObservableStream2(inDto: ChatCompletionStreamInDto, taskId?: number): Observable<string> {
    return new Observable<string>((observer) => {
      // スレッド用にUUIDを生成
      const threadId = Utils.generateUUID();

      // 監視オブジェクトを登録
      this.subscriberMap[threadId] = observer;

      // EventSourceを開く
      this.open().subscribe((result) => {
        this.http.post(`${this.baseUrl}/chat-completion?connectionId=${this.clientId}&threadId=${threadId}`, { ...inDto, taskId }, { headers: this.authService.getHeaders() }).subscribe({
          next: (result) => {
            // Handle response
            // eventSourceのイベントハンドラで処理するので何もしない
          },
          error: (error) => {
            // Handle error
            console.error(error);
            observer.error();
          },
        });
      });
    });
  }
}
