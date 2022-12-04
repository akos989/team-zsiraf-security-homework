import {Component} from '@angular/core';
import {Caff} from "../../../model/caff.model";
import {CaffService} from "../../../service/caff.service";
import {Router} from "@angular/router";
import {CaffUsageType} from "../../../model/caff-usage-type.enum";

@Component({
  selector: 'app-uploaded-list',
  templateUrl: './uploaded-list.component.html',
  styleUrls: ['./uploaded-list.component.scss']
})
export class UploadedListComponent {
  caffList: Caff[] = [];

  constructor(private caffService: CaffService, private router: Router) {
    this.fetchCaffList()
  }

  private fetchCaffList() {
    this.caffService.fetchUploadedCaff()
      .subscribe(caffs => this.caffList = caffs);
  }

  onCaffSelected(selectedCaff: Caff) {
    this.router.navigate([`/client/${selectedCaff.id}/caff-detail`], { fragment: CaffUsageType.uploaded });
  }
}
