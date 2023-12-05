import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, ObservableInput, Subject, catchError, concatMap, delay, delayWhen, of, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GService } from './services/g.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    private lastRun: number = Date.now();
    constructor(
        private g: GService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url;
        // パスだけ取得？
        // let url = request.url.replace(/https?:\/\/[^/]+/g, '').replace('//', '/').replace(/^\//g, '');
        let method = request.method;
        // console.log(`${method} ${url}`);
        // 開発環境の場合はローカルのjsonファイルに向ける
        // !environment.production ||
        if (this.g.queries['isMock']) {
            url = `assets/mock/${url}-${request.method}.json`;
            method = 'GET';
        } else {
            // 本番環境の場合は環境変数で指定したAPIのエンドポイントに向ける
            url = `${environment.apiUrl}/${request.url}`;
        }
        request = request.clone({ url, method });

        // 同時リクエストが多くなるとブラウザエラーになるので、適当に遅延させる
        let delayTime = 0;
        if (Date.now() - this.lastRun < 10) {
            delayTime = Math.random() * 100;
            // console.log(`delay ${delayTime}[ms]`); // tslint:disable-line:no-console
        } else { }
        this.lastRun = Date.now();
        // return of(null).pipe(
        //     delayWhen(() => timer(delayTime)),    // リクエストの発射を遅らせる
        //     switchMap(() => next.handle(request)) // 実際のリクエストを処理
        // );

        // 手間だけど結局settimeoutで遅延させるのが一番確実
        return new Observable<HttpEvent<any>>((observer) => {
            setTimeout(() => {
                next.handle(request).subscribe({
                    next: (event) => { observer.next(event); },
                    error: (err) => { observer.error(err); },
                    complete: () => { observer.complete(); },
                });
            }, delayTime);
        });
        return next.handle(request).pipe(
            delay(delayTime),
        );
    }
}
@Injectable()
export class QueueInterceptor implements HttpInterceptor {
    private requestQueue: HttpRequest<any>[] = [];
    private requestProcessing = false;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestSubject = new Subject<HttpEvent<any>>();

        this.requestQueue.push(req);
        this.processNextRequest(next, requestSubject);

        return requestSubject.asObservable();
    }

    private processNextRequest(next: HttpHandler, subject: Subject<HttpEvent<any>>): ObservableInput<any> {
        if (this.requestProcessing || this.requestQueue.length === 0) {
            // キューが空の場合は何もしない
            return subject.asObservable();
        } else { }

        this.requestProcessing = true;
        const nextRequest = this.requestQueue.shift() as HttpRequest<any>;

        next.handle(nextRequest).pipe(
            concatMap(event => {
                subject.next(event);
                return this.processNextRequest(next, subject);
            })
        ).subscribe({
            next: () => { },
            error: error => subject.error(error),
            complete: () => {
                this.requestProcessing = false;
                subject.complete();
                this.processNextRequest(next, subject);
            }
        });
        return subject.asObservable();
    }
}