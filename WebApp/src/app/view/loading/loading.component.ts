import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loadingSubject: Subject<boolean> = this.loaderService.isLoading;
  isLoading: boolean = false;

  constructor(
    private loaderService: LoaderService,
  ){ }

  ngOnInit() {
    this.loadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
    })
  }
}
