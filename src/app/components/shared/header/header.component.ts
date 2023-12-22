import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username = ''; // TO DO - implement when the login service is available
  totalPrice = 0; // TO DO - implement when the cart service is available

  isProfileMenuActive = false;
  isCartMenuActive = false;

  constructor(
    private themeService: ThemeService, // Required to initialize the theme service and set the saved theme
  ) { }

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
