// src/app/parts/comments-section.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../models/models';
import { CollaborationService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss'],
  standalone: true,
  imports: [AppCommonModule],
})
export class CommentsSectionComponent implements OnInit {

  @Input() comments?: Comment[];
  @Output() add: EventEmitter<Comment> = new EventEmitter<Comment>();

  commentContent: string = '';

  constructor(
    private collaborationService: CollaborationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Fetch comments when the component is initialized
    this.fetchComments();
  }

  emit(content: string): void {
    this.add.emit({ id: -1, authorId: -1, projectId: -1, content: content, createdAt: new Date() });
  }

  fetchComments(): void {
    // Assuming projectId is available in the component
    const projectId = this.getProjectId();
    this.collaborationService.getComments(projectId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        this.snackBar.open('コメントの取得に失敗しました。', '閉じる', {
          duration: 3000,
        });
      }
    );
  }

  onAddComment(): void {
    if (!this.commentContent.trim()) {
      this.snackBar.open('コメントを入力してください。', '閉じる', {
        duration: 3000,
      });
      return;
    }

    // Assuming projectId is available in the component
    const projectId = this.getProjectId();
    const newComment = new Comment(Date.now(), this.getUserId(), projectId, this.commentContent, new Date());

    this.collaborationService.addComment(projectId, newComment).subscribe(
      (comment) => {
        this.comments?.push(comment);
        this.add.emit(comment);
        this.commentContent = ''; // Clear the input field
      },
      (error) => {
        this.snackBar.open('コメントの投稿に失敗しました。もう一度お試しください。', '閉じる', {
          duration: 3000,
        });
      }
    );
  }

  // Placeholder method to get the current project ID
  private getProjectId(): number {
    // TODO: Implement method to retrieve the current project ID
    return 0; // Replace with actual project ID retrieval logic
  }

  // Placeholder method to get the current user ID
  private getUserId(): number {
    // TODO: Implement method to retrieve the current user ID
    return 0; // Replace with actual user ID retrieval logic
  }
}
// 
// Please note that the `getProjectId` and `getUserId` methods are placeholders and should be implemented to retrieve the actual project and user IDs, respectively. The `MatSnackBar` is used to display error messages to the user. The `onAddComment` method checks if the comment content is not empty before attempting to add the comment. If the comment is successfully added, it is emitted to the parent component and the input field is cleared.