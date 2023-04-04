import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '../common/order';
import { OrderHistory } from '../common/order-history';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  private orderUrl =
    'http://localhost:8080/api/orders/search/findByCustomerEmailOrderByDateCreatedDesc?email=';


  constructor(private httpClient: HttpClient) {

  }

  getOrdersHistory(email: string): Observable<GetResponseOrderHistory> {
    const searchUrl = this.orderUrl + email;
    return this.httpClient.get<GetResponseOrderHistory>(searchUrl)
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[]
  }
}
