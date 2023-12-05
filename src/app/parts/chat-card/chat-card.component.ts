import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { MarkdownModule } from 'ngx-markdown';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
  selector: 'app-chat-card',
  standalone: true,
  imports: [AppCommonModule, MarkdownModule],
  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.scss'
})
export class ChatCardComponent {

  chatResponse!: { status: number, text: string };

  constructor(
    private chatService: ChatService,
  ) {
  }

  // public send(reqDto: ChatRequest): Observable<string> {
  //   return this.chatService.chatCompletions(reqDto).pipe({

  //     // // チャットの進捗状況を保存
  //     // next: text => this.chatResponse.text += text,
  //     // error: error => console.error(error),
  //     // complete: () => {
  //     //   this.chatResponse.status = 1;
  //     //   observer.next(clientId);
  //     //   observer.complete();
  //     // }
  //   });
  // }
}
