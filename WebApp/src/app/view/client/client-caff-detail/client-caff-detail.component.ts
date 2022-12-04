import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CaffUsageType} from "../../../model/caff-usage-type.enum";
import {Caff} from "../../../model/caff.model";
import {CaffService} from "../../../service/caff.service";

@Component({
  selector: 'app-client-caff-detail',
  templateUrl: './client-caff-detail.component.html',
  styleUrls: ['./client-caff-detail.component.scss']
})
export class ClientCaffDetailComponent {

  caff: Caff;
  caffUsageType: CaffUsageType;
  allCaffUsageTypes = CaffUsageType;

  constructor(private route: ActivatedRoute, private caffService: CaffService) {
    this.getCaffUsageTypeFromRoute();
    this.getCaffFromRouteParam();
  }

  private getCaffUsageTypeFromRoute() {

    this.caffUsageType = (() => {
      switch (this.route.snapshot.fragment) {
        case CaffUsageType.uploaded: return CaffUsageType.uploaded
        case CaffUsageType.purchased: return CaffUsageType.purchased
        default: return CaffUsageType.neutral
      }
    })();
  }

  private getCaffFromRouteParam() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if (id) {
      const foundCaff = this.caffService.getCaffById(id);
    console.log(foundCaff)
      if (foundCaff) {
        this.caff = foundCaff;
      }
    }
  }
}
