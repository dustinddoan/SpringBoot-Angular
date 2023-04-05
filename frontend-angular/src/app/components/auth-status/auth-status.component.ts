import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { concatMap, map, tap } from 'rxjs/operators';
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
  accessToken: string = '';
  baseURL = "https://openmarket.us.auth0.com/api/v2/users/"
  userInfo: any = {};
  constructor(
    public auth: AuthService,
    private cartService: CartService,
    private http: HttpClient
  ) {
    let isAuth = JSON.parse(this.storage.getItem('auth')!);
    let email = JSON.parse(this.storage.getItem('email')!);
    let name = JSON.parse(this.storage.getItem('name')!);
    // console.log('constructor email', email);
    if (isAuth != null) {
      this.isAuthenticated = isAuth;
      this.userEmail = email;
      this.userFullName = name;
      this.getUserInfo();
    }
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((result) => {
      this.isAuthenticated = result;

      this.auth.user$.subscribe((user) => {
        console.log('user', user);

        this.baseURL +=  user!.sub;
        this.auth
          .getAccessTokenSilently()
          .subscribe((token) => {
            this.accessToken = token;

            this.getUserInfo();
          });


      });
    });
  }

  getUserInfo() {
    console.log('getUserInfo baseurl:' + this.baseURL);
    this.http.get(this.baseURL,
      {headers: {
        'Authorization': 'Bearer ' + this.accessToken,
        'Content-Type':'application/json'}
      }).subscribe(user => {
      console.log('data user', user);
      this.userInfo = user;
      this.userFullName = this.userInfo.name;
      this.userEmail = this.userInfo.email;

      this.storage.setItem('auth', JSON.stringify(this.isAuthenticated));
      this.storage.setItem('email', JSON.stringify(this.userEmail));
      this.storage.setItem('name', JSON.stringify(this.userFullName));
      this.storage.setItem('token', JSON.stringify(this.accessToken));

    })
  }
  // https://openmarket.us.auth0.com/api/v2/users/auth0|6425f19067f2e6ad3c72dbeb


  logIn() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout({
      logoutParams: {
        clientId: 'ghNyYJ7hXX9yuZoSU1vy6flmlDBH4GJz',
        returnTo: document.location.origin,
      },
    });
    this.storage.removeItem('cartItems');
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
  }
}
