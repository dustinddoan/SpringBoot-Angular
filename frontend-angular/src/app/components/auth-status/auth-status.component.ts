import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: ['./auth-status.component.css']
})
export class AuthStatusComponent {

  isAuthenticated: boolean = false;
  userFullName: string = '';
  storage: Storage = sessionStorage;
  constructor(public auth: AuthService,
    private cartService: CartService) {
    let isAuth = JSON.parse(this.storage.getItem('auth')!);
    if (isAuth != null) {
      this.isAuthenticated = isAuth;
      this.getUserDetails();
    }
  }


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

        this.storage.setItem('auth', JSON.stringify(this.isAuthenticated));
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

      this.cartService.cartItems = []
      this.cartService.totalPrice.next(0);
      this.cartService.totalQuantity.next(0);
  }
}
