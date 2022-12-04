import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CaffService} from "../../../service/caff.service";
import {Caff} from "../../../model/caff.model";

@Component({
  selector: 'app-admin-caff-detail',
  templateUrl: './admin-caff-detail.component.html',
  styleUrls: ['./admin-caff-detail.component.scss']
})
export class AdminCaffDetailComponent {

  caff: Caff;

  constructor(private route: ActivatedRoute, private caffService: CaffService) {
    this.getCaffFromRouteParam();
  }

  private getCaffFromRouteParam() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundCaff = this.caffService.getCaffById(id);
      if (foundCaff) {
        this.caff = foundCaff;
      }
    }
  }
}
