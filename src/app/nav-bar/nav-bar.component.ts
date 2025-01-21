import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  public constructor(
    private router: Router,
    private themeService: ThemeService,
    public authService: AuthService,
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

  public openUserUpdate(): void {
    this.router.navigate(['/user-update']);
  }
}
