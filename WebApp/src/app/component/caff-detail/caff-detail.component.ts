import {AfterContentInit, AfterViewInit, Component, Input} from '@angular/core';
import { environment } from 'src/environments/environment';
import {Caff} from "../../model/caff.model";

@Component({
  selector: 'app-caff-detail',
  templateUrl: './caff-detail.component.html',
  styleUrls: ['./caff-detail.component.scss']
})
export class CaffDetailComponent implements AfterContentInit {
  @Input() caff: Caff;

  gifUrl = environment.gifUrl

  gifRef = "";

  

  constructor() {
  }

  ngAfterContentInit(): void {
    this.gifRef = this.gifUrl + this.caff.gifRef;
  }
}
