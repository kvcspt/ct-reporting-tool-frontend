import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = true;

  public toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.remove(
      'bg-dark',
      'text-light',
      'bg-light',
      'text-dark',
    );

    if (this.isDarkTheme) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
    }
  }

  public isDarkMode(): boolean {
    return this.isDarkTheme;
  }
}
