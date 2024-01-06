import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  username = '';
  totalPrice = 0; // TO DO - implement when the cart service is available

  isProfileMenuActive = false;
  isCartMenuActive = false;

  private _usernameSubscription?: Subscription;

  constructor(
    private themeService: ThemeService, // Required to initialize the theme service and set the saved theme
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this._usernameSubscription = this.userService.username.subscribe((username) => {
      this.username = username;
    });
  }

  ngOnDestroy(): void {
    this._usernameSubscription?.unsubscribe();
  }

  toggleProfileMenu(): void {
    this.isProfileMenuActive = !this.isProfileMenuActive;
  }

  toggleCartMenu(): void {
    this.isCartMenuActive = !this.isCartMenuActive;
  }

  closeMenu(): void {
    this.isProfileMenuActive = false;
    this.isCartMenuActive = false;
  }
}
