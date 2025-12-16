import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Button, ButtonDirective, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [
    ButtonModule
  ],
  templateUrl: './dark-mode-toggle.html',
  styleUrl: './dark-mode-toggle.css',
})
export class DarkModeToggle {

  currentIcon: string;
  private element = document.querySelector('html')!;
  constructor() {
    this.currentIcon = 'mdi mdi-white-balance-sunny'; 
    this.updateIcon();
  }
  toggleDarkMode() {
    this.element.classList.toggle('my-app-dark');
    this.updateIcon();
  }
  updateIcon() {
    const isDark = this.element.classList.contains('my-app-dark');
    this.currentIcon = isDark 
      ? 'mdi mdi-white-balance-sunny'
      : 'mdi mdi-weather-night';
  }
}
