import {Component} from '@angular/core';
import {Caff} from "../../model/caff.model";
import {Router} from "@angular/router";
import {CaffUsageType} from "../../model/caff-usage-type.enum";
import {CaffService} from "../../service/caff.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  caffUsageType = CaffUsageType.neutral;
  caffList: Caff[] = []

  constructor(private router: Router, private caffService: CaffService) {
    this.getParamsFromRoute();
    this.fetchCaffList();
  }

  private getParamsFromRoute() {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if (navigationState) {
      this.caffUsageType = navigationState['caffUsageType']
    }
  }

  private fetchCaffList() {
    let fetchCaffSub: Observable<Caff[]>;
    switch (this.caffUsageType) {
      case CaffUsageType.admin || CaffUsageType.neutral: fetchCaffSub = this.caffService.fetchAllCaff(); break;
      case CaffUsageType.purchased: fetchCaffSub = this.caffService.fetchPurchasedCaff(); break;
      case CaffUsageType.uploaded: fetchCaffSub = this.caffService.fetchUploadedCaff(); break;
      default: fetchCaffSub = this.caffService.fetchAllCaff(); break;
    }
    fetchCaffSub.subscribe(caffs => {
      this.caffList = caffs;
    });
  }

  selectItem(selectedCaff: Caff) {
    this.router.navigateByUrl('/detail', { state: {
      selectedCaff: selectedCaff,
      caffUsageType: this.caffUsageType
    } });
  }
}
