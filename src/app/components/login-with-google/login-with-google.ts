import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-with-google',
  imports: [],
  templateUrl: './login-with-google.html',
  styleUrl: './login-with-google.css',
})
export class LoginWithGoogle implements OnInit {

ngOnInit() {
  // (window as any).login = this.login.bind(this);
}

}
