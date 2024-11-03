import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  constructor(public authService: AuthService, private themeService: ThemeService) {}

  logout() {
    this.authService.logout();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
