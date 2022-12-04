import {Component} from '@angular/core';
import {Caff} from "../../../model/caff.model";
import {CaffService} from "../../../service/caff.service";
import {Router} from "@angular/router";
import {CaffUsageType} from "../../../model/caff-usage-type.enum";

@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.scss']
})
export class PurchasedListComponent {
  caffList: Caff[] = [];

  constructor(private caffService: CaffService, private router: Router) {
    this.fetchCaffList()
  }

  private fetchCaffList() {
    this.caffService.fetchPurchasedCaff()
      .subscribe(caffs => this.caffList = caffs);
  }

  onCaffSelected(selectedCaff: Caff) {
    this.router.navigate([`/client/${selectedCaff.id}/caff-detail`], { fragment: CaffUsageType.purchased });
  }
}
