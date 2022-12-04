import {Component} from '@angular/core';
import {CaffService} from "../../../service/caff.service";
import {Caff} from "../../../model/caff.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent {

  caffList: Caff[] = [];

  constructor(private caffService: CaffService, private router: Router) {
    this.fetchCaffs();
  }

  private fetchCaffs() {
    this.caffService.fetchAllCaff()
      .subscribe(caffs => this.caffList = caffs);
  }

  onCaffSelected(selectedCaff: Caff) {
    this.router.navigate([`/admin/${selectedCaff.id}/caff-detail`]);
  }
}
