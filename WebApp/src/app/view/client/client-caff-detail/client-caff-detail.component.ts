import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caffService: CaffService
  ) {
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
    if (id) {
      this.caffService.fetchCaffById(id)
        .subscribe(caff => this.caff = caff);
    }
  }

  onPurchase() {
    this.caffService.purchaseCaff(this.caff)
      .subscribe(_ => {
        this.router.navigate([`/client/${this.caff.id}/caff-detail`], { fragment: CaffUsageType.purchased });
      });
  }

  onDelete() {
    this.caffService.deleteCaff(this.caff)
      .subscribe(_ => {
        this.router.navigate([`/client/uploaded-list`]);
      });
  }

  onDownload() {
    this.caffService.deleteCaff(this.caff)
      .subscribe(_ => {
        // Todo: download caff to users computer
      });
  }

  onAddComment() {

  }
}
