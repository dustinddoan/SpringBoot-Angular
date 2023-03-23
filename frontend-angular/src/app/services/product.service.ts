import { Product } from './../common/product';
import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  constructor(private httpClient: HttpClient) { }
  // return an observable map the JSON data from Spring Data REST API to Pdoruct Array
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products as Product[])
    )
  }


}

interface GetResponse {
  _embedded: {
    products: Product[]
  }
}
