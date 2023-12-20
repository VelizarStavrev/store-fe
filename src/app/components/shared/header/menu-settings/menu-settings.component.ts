import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss'],
})
export class MenuSettingsComponent {
  @Input() currentTheme: 'Normal' | 'Dark' = 'Normal';
  themeToggleOptions = {
    toggleHeader: 'Theme',
    leftOption: 'Normal',
    rightOption: 'Dark',
  };

  isUserLoggedIn = false; // TO DO - implement when the login service is available

  constructor(
    private themeService: ThemeService,
  ) { }

  toggleTheme(theme: string): void {
    this.themeService.setTheme(theme === 'Dark' ? theme : 'Normal');
  }

  userLogout(): void {
    // TO DO - implement when the login service is available
  }
}
