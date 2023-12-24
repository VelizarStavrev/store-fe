import { Component, OnDestroy, OnInit } from '@angular/core';

// Services
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UserService } from 'src/app/services/user/user.service';

// Interfaces
import { Theme } from 'src/app/interfaces/theme';
import { ButtonLinkOptions } from 'src/app/interfaces/button-link-options';
import { ButtonOptions } from 'src/app/interfaces/button-options';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss'],
})
export class MenuSettingsComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'Normal';

  registerButtonOptions: ButtonLinkOptions = {
    buttonText: 'Register',
    buttonType: 'secondary',
    buttonLink: '/register',
    buttonWidthFull: true,
  };

  loginButtonOptions: ButtonLinkOptions = {
    buttonText: 'Login',
    buttonType: 'secondary',
    buttonLink: '/login',
    buttonMarginTop: true,
    buttonWidthFull: true,
  };

  profileButtonOptions: ButtonLinkOptions = {
    buttonText: 'Edit',
    buttonType: 'secondary',
    buttonLink: '/profile',
    buttonWidthFull: true,
  };

  logoutButtonOptions: ButtonOptions = {
    buttonText: 'Log out',
    buttonType: 'secondary',
    buttonMarginTop: true,
    buttonWidthFull: true,
  };

  themeToggleOptions: {
    toggleHeader: string,
    leftOption: Theme,
    rightOption: Theme,
  } = {
      toggleHeader: 'Theme',
      leftOption: 'Normal',
      rightOption: 'Dark',
    };

  isUserLoggedIn = false;
  private _isUserLoggedInSubscription?: Subscription;

  constructor(
    private themeService: ThemeService,
    private userService: UserService,
  ) {
    this.currentTheme = themeService.getTheme();
  }

  ngOnInit(): void {
    this._isUserLoggedInSubscription = this.userService.isUserLoggedIn.subscribe((isUserLoggedIn) => {
      this.isUserLoggedIn = isUserLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this._isUserLoggedInSubscription?.unsubscribe();
  }

  toggleTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.themeService.setTheme(theme);
  }

  userLogout(): void {
    this.userService.userLogout();
  }
}
