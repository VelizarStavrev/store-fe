import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'Normal' | 'Dark' = 'Normal';

  constructor(
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    const theme = localStorage.getItem('theme');

    if (theme && (theme === 'Normal' || theme === 'Dark')) {
      this.setTheme(theme);
    }
  }

  setTheme(theme: 'Normal' | 'Dark'): void {
    this.currentTheme = theme;
    
    if (theme === 'Dark') {
      this.renderer.addClass(document.body, 'theme-dark');
      this.renderer.removeClass(document.body, 'theme-normal');
    } else {
      this.renderer.addClass(document.body, 'theme-normal');
      this.renderer.removeClass(document.body, 'theme-dark');
    }

    localStorage.setItem('theme', theme);
  }

  getTheme(): 'Normal' | 'Dark' {
    return this.currentTheme;
  }
}
