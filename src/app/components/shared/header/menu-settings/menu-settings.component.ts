import { Component, Input } from '@angular/core';
import { ButtonLinkOptions } from 'src/app/interfaces/button-link-options';
import { ButtonOptions } from 'src/app/interfaces/button-options';
import { Theme } from 'src/app/interfaces/theme';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss'],
})
export class MenuSettingsComponent {
  @Input() currentTheme: Theme = 'Normal';

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

  isUserLoggedIn = true; // TO DO - implement when the login service is available

  constructor(
    private themeService: ThemeService,
  ) { }

  toggleTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  userLogout(): void {
    // TO DO - implement when the login service is available
  }
}
