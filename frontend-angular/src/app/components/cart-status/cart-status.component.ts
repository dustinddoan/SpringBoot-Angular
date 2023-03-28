import { Component } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent {
  constructor(
    private cartService: CartService
  ) { }

  carts : Product[] = [];
  totalAmount: number = 0;
  product!: Product;
  itemsInCart: number = 0;
  totalQuantity: number = 0;
  alreadyInCart: boolean = false;
  ngOnInit() {
    this.updateCarts();
  }
  updateCarts() {
    this.cartService.totalPrice.subscribe(data => {
      this.totalAmount = data;
    })

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })
  }
}
