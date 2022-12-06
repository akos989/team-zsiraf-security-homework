import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Comment } from '../../model/comment.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent {
  @Input() comments: Comment[];
  @Input() isAdmin = false;

  @Output() onCommentAdded = new EventEmitter<string>();
  @Output() onCommentDeleted = new EventEmitter<Comment>();

  @ViewChild('commentForm') commentForm: NgForm;

  constructor() {}

  onCommentSubmitted() {
    const commentText = this.commentForm.form.controls['commentInput'].value;
    this.onCommentAdded.emit(commentText);
  }

  onCommentDeletePressed(comment: Comment) {
    this.onCommentDeleted.emit(comment);
  }
}
