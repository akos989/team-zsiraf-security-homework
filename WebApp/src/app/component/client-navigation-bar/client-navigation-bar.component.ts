import { Component } from '@angular/core';
import { AuthService } from '../../service/authentication.service';

@Component({
  selector: 'app-client-navigation-bar',
  templateUrl: './client-navigation-bar.component.html',
  styleUrls: ['./client-navigation-bar.component.scss']
})
export class ClientNavigationBarComponent {

  constructor(private authService: AuthService) { }

  async onLogoutButtonClick() {
    await this.authService.logout();
  }
}
