import { Component } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username = ''; // TO DO - implement when the login service is available
  currentTheme: Theme = 'Normal';
  totalPrice = 0; // TO DO - implement when the cart service is available

  isProfileMenuActive = false;
  isCartMenuActive = false;

  constructor(
    themeService: ThemeService,
  ) {
    this.currentTheme = themeService.getTheme();
  }

  openProfileMenu(): void {
    this.isProfileMenuActive = true;
  }

  openCartMenu(): void {
    this.isCartMenuActive = true;
  }

  closeMenu(): void {
    this.isProfileMenuActive = false;
    this.isCartMenuActive = false;
  }
}
