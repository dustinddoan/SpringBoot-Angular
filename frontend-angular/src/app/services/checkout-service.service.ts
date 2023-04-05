import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
  storage:Storage = sessionStorage;
  constructor(
    private httpClient: HttpClient
  ) { }

  placeOrder(purchase: Purchase): Observable<any> {
    let token = JSON.parse(sessionStorage.getItem('token')!);
    return this.httpClient.post<Purchase>(this.purchaseUrl,purchase, {
      headers: { 'Authorization': 'Bearer ' + token}
    });
  }
}
