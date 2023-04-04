import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: ['./auth-status.component.css'],
})
export class AuthStatusComponent {
  isAuthenticated: boolean = false;
  userFullName: string = '';
  userEmail: string = '';
  storage: Storage = sessionStorage;

  constructor(public auth: AuthService, private cartService: CartService) {
    let isAuth = JSON.parse(this.storage.getItem('auth')!);
    let email = JSON.parse(this.storage.getItem('email')!);
    let name = JSON.parse(this.storage.getItem('name')!);
    console.log('constructor', isAuth);
    // console.log('constructor email', email);
    if (isAuth != null) {
      this.isAuthenticated = isAuth;
      this.userEmail = email;
      this.userFullName = name;
      this.setUserDetails();
    }
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((result) => {
      console.log('result: ' + result)
      this.isAuthenticated = result;

      this.auth.user$.subscribe((user) => {
        console.log('user', user);
        this.userFullName = user?.name!;
        this.userEmail = user?.email!;

        this.setUserDetails();
      });
    });




  }
  setUserDetails() {

    if (this.isAuthenticated) {

      this.storage.setItem('auth', JSON.stringify(this.isAuthenticated));
      this.storage.setItem('email', JSON.stringify(this.userEmail));
      this.storage.setItem('name', JSON.stringify(this.userFullName));
    }
  }

  logIn() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout({
      logoutParams: {
        clientId: 'YU9vhZammk5U5I6l0FdCHLCo05JPFw0r',
        returnTo: document.location.origin,
      },
    });
    this.storage.removeItem('cartItems')
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.cartService.resetCart();
  }
}
