import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  public constructor(
    public authService: AuthService,
    private themeService: ThemeService,
  ) {}

  public logout(): void {
    this.authService.logout();
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  public isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
