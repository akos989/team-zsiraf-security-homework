import {Component} from '@angular/core';
import {Caff} from "../../model/caff.model";
import {Router} from "@angular/router";
import {CaffUsageType} from "../../model/caff-usage-type.enum";
import {CaffService} from "../../service/caff.service";
import {tap} from "rxjs";
import {LoaderService} from "../../service/loader.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  caffUsageType = CaffUsageType.neutral;
  caffList: Caff[] = []

  constructor(
    private router: Router,
    private caffService: CaffService,
    private loaderService: LoaderService) {
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
    this.loaderService.show();

    const fetchCaffSub = (() => {
      switch (this.caffUsageType) {
        case CaffUsageType.admin || CaffUsageType.neutral: return this.caffService.fetchAllCaff();
        case CaffUsageType.purchased: return this.caffService.fetchPurchasedCaff();
        case CaffUsageType.uploaded: return this.caffService.fetchUploadedCaff();
        default: return this.caffService.fetchAllCaff();
      }
    })();

    fetchCaffSub
      .pipe(
        tap(_ => {
          this.loaderService.hide();
        }),
        catchError((error, caught) => {
          console.log(error); // Todo: show some error dialog
          return caught;
        })
      )
      .subscribe(caffs => {
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
