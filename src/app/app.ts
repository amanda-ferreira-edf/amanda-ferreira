import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeToggle } from "./components/dark-mode-toggle/dark-mode-toggle";
import { AuthService } from './services/auth.service';
import { LogoutButton } from "./components/logout-button/logout-button";
import { PrimeNG} from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DarkModeToggle, LogoutButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('amanda-ferreira');
  constructor(private authService: AuthService) { }
  ngOnInit() {
    let userLogged = this.authService.getUserLogged();
    if (userLogged) {
      this.authService.setUserLogged(userLogged);
    }
    (window as any).handleCredentialResponse = (response: any) => {
      this.authService.loginAuth2(response).subscribe({
        next: (res) => {
          if (res.access_token) {
            this.authService.setLocalStorageUserLogged(res);
            this.authService.setUserLogged(res);
          }
        },
        error: (err) => console.error(err)
      });
    };
  }
}
