import {Component} from '@angular/core';
import {Caff} from "../../model/caff.model";
import {Router} from "@angular/router";
import {CaffUsageType} from "../../model/caff-usage-type.enum";

@Component({
  selector: 'app-caff-detail',
  templateUrl: './caff-detail.component.html',
  styleUrls: ['./caff-detail.component.scss']
})
export class CaffDetailComponent {
  caff: Caff;
  caffUsageType = CaffUsageType.neutral;
  allCaffUsageTypes = CaffUsageType;

  constructor(private router: Router) {
      const navigationState = this.router.getCurrentNavigation()?.extras.state;
      if (navigationState) {
        this.caff = navigationState['selectedCaff'];
        this.caffUsageType = navigationState['caffUsageType']
      }
  }
}
