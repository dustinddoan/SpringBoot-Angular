import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private productSource = new BehaviorSubject<Product|undefined>(undefined);
  product = this.productSource.asObservable();

  addProductToCart(product: Product) {
    this.productSource.next(product);
  }

  // another approach:
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  addCartItemToCart(item: CartItem) {
    console.log('addCartItemToCart')
    let alreadyInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === item.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
      alreadyInCart = (existingCartItem !== undefined);


    }

    if (alreadyInCart && existingCartItem?.quantity !== undefined) {
      existingCartItem.quantity ++
    } else {
      this.cartItems.push(item);
    }

    let totalPrice = 0;
    let totalQuantity = 0;

    for (let tempCartItem of this.cartItems) {
      totalPrice += tempCartItem.unitPrice * tempCartItem.quantity;
      totalQuantity += tempCartItem.quantity;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
  }

  itemsInCart(): CartItem[] {
    return this.cartItems;
  }

  computeCartTotal() {
    let totalPrice = 0;
    let totalQuantity = 0;
    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        totalPrice += tempCartItem.unitPrice * tempCartItem.quantity;
        totalQuantity += tempCartItem.quantity;
      }
      this.totalPrice.next(totalPrice);
      this.totalQuantity.next(totalQuantity);
    }


  }

}
