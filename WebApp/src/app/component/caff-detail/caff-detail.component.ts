import {Component, Input} from '@angular/core';
import {Caff} from "../../model/caff.model";

@Component({
  selector: 'app-caff-detail',
  templateUrl: './caff-detail.component.html',
  styleUrls: ['./caff-detail.component.scss']
})
export class CaffDetailComponent {
  @Input() caff: Caff;

  constructor() {
  }
}
