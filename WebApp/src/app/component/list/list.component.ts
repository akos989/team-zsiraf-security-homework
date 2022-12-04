import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Caff} from "../../model/caff.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() caffList: Caff[] = []
  @Output() onItemSelected = new EventEmitter<Caff>();

  constructor() {
  }

  selectItem(selectedCaff: Caff) {
    this.onItemSelected.next(selectedCaff);
  }
}
