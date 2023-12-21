import { Component, Input } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss'],
})
export class MenuSettingsComponent {
  @Input() currentTheme: Theme = 'Normal';
  themeToggleOptions: {
    toggleHeader: string,
    leftOption: Theme,
    rightOption: Theme,
  } = {
      toggleHeader: 'Theme',
      leftOption: 'Normal',
      rightOption: 'Dark',
    };

  isUserLoggedIn = false; // TO DO - implement when the login service is available

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
