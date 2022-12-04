import { Component } from '@angular/core';
import { AuthService } from '../../service/authentication.service';

@Component({
  selector: 'app-admin-navigation-bar',
  templateUrl: './admin-navigation-bar.component.html',
  styleUrls: ['./admin-navigation-bar.component.scss']
})
export class AdminNavigationBarComponent {

  constructor(private authService: AuthService) { }

  async onLogoutButtonClick() {
    await this.authService.logout();
  }

}
