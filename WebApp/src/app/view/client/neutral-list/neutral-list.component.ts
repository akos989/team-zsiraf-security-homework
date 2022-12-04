import {Component} from '@angular/core';
import {Caff} from "../../../model/caff.model";
import {CaffService} from "../../../service/caff.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-neutral-list',
  templateUrl: './neutral-list.component.html',
  styleUrls: ['./neutral-list.component.scss']
})
export class NeutralListComponent {

  caffList: Caff[] = [];

  constructor(private caffService: CaffService, private router: Router) {
    this.fetchCaffList();
  }

  private fetchCaffList() {
    this.caffService.fetchAllCaff()
      .subscribe(caffs => this.caffList = caffs);
  }

  onCaffSelected(selectedCaff: Caff) {
    this.router.navigate([`/client/${selectedCaff.id}/caff-detail`]);
  }
}
