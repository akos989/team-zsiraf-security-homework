import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Subscription} from "rxjs";
import {AuthenticationType} from "../../model/authentication-type.enum";
import {Router} from "@angular/router";
import {CaffUsageType} from "../../model/caff-usage-type.enum";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {
  authenticationSub: Subscription;
  authenticationType = AuthenticationType.unauthenticated;
  allCaffUsageTypes = CaffUsageType;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.authenticationSub = this.authService.authenticationType.subscribe(newAuthenticationType =>
      this.authenticationType = newAuthenticationType
    );
  }

  navigate(url: string, caffUsageType: CaffUsageType) {
    if (this.authenticationType == AuthenticationType.admin) {
      caffUsageType = CaffUsageType.admin;
    }
    this.router.navigateByUrl(url, {state: { caffUsageType: caffUsageType }})
  }

  ngOnDestroy() {
    if (this.authenticationSub) {
      this.authenticationSub.unsubscribe()
    }
  }
}
