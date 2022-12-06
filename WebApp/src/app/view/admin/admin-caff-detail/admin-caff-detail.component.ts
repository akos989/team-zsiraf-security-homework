import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaffService} from "../../../service/caff.service";
import {Caff} from "../../../model/caff.model";
import {Comment} from "../../../model/comment.model";

@Component({
  selector: 'app-admin-caff-detail',
  templateUrl: './admin-caff-detail.component.html',
  styleUrls: ['./admin-caff-detail.component.scss']
})
export class AdminCaffDetailComponent {

  caff: Caff;

  constructor(private route: ActivatedRoute,
              private caffService: CaffService,
              private router: Router) {
    this.getCaffFromRouteParam();
  }

  private getCaffFromRouteParam() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caffService.fetchCaffById(id)
        .subscribe(caff => this.caff = caff);
    }
  }

  onDeleteComment(comment: Comment) {
    this.caffService.deleteComment(comment)
      .subscribe(_ => {
        const deletedCommentId = this.caff.comments.indexOf(comment);
        this.caff.comments.splice(deletedCommentId, 1);
      });
  }

  onDeleteButtonClick() {
    this.caffService.deleteCaff(this.caff)
      .subscribe(() => {
        this.router.navigate(['/admin']);
      })
  }
}
