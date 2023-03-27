import { Product } from './../common/product';
import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  private productCategoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }
  // return an observable map the JSON data from Spring Data REST API to Pdoruct Array
  getProductList(categoryId: number): Observable<Product[]> {

    // need to build URL base on categoryId
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
    console.log('searchurl', searchUrl);

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductCategoryList() {
    return this.httpClient.get<GetResponseProductsCategory>(this.productCategoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[]
  }
}
interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
