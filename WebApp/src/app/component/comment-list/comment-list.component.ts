import {Component, Input, ViewChild} from '@angular/core';
import {Comment} from "../../model/comment.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  @Input() comments: Comment[];
  @Input() isAdmin = false;

  @ViewChild('commentForm') commentForm: NgForm;

  constructor() { }

  onCommentSubmitted() {
    //
  }
}
