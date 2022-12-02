import { Component } from '@angular/core';
import { LoaderService } from './service/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WebApp';
  loadingSubject: Subject<boolean> = this.loaderService.isLoading;
  isLoading: boolean = false;

  constructor(
    private loaderService: LoaderService
  ){ }

  ngOnInit() {
    this.loadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
    })
  }
}
