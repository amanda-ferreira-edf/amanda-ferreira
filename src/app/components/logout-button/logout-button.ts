import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../models/userDTO';

@Component({
  selector: 'app-logout-button',
  imports: [
    ButtonModule,
    CommonModule,
    TooltipModule
  ],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {
  isLogged = signal<boolean>(false);
  constructor(private authService: AuthService) { 
    this.authService.userLogged$.subscribe((userLogged: UserDTO|null) => {this.isLogged.set(userLogged !== null);});
  }
  logout() {
    localStorage.removeItem('userLogged');
    this.authService.setUserLogged(null);
  }
}
