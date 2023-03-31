import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: ['./auth-status.component.css']
})
export class AuthStatusComponent {
  constructor(public auth: AuthService) { }
  isAuthenticated: boolean = false;
  userFullName: string = '';

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(result => {
      this.isAuthenticated = result;
      this.getUserDetails()
    })
  }
  getUserDetails() {
    console.log('Logged authenticated: ', this.isAuthenticated);
    if (this.isAuthenticated) {
      this.auth.user$.subscribe(user => {
        console.log('user: ' + user?.name);
        this.userFullName = user?.name!;

      })

    }
  }

  logIn() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout({ logoutParams: {
      clientId: 'YU9vhZammk5U5I6l0FdCHLCo05JPFw0r',
      returnTo: document.location.origin } })
  }
}
