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

  // carts : Product[] = [];
  // product!: Product;
  // itemsInCart: number = 0;
  // alreadyInCart: boolean = false;

  totalQuantity: number = 0;
  totalAmount: number = 0;


  ngOnInit() {
    this.updateCarts();
  }
  updateCarts() {
    this.cartService.computeCartTotal();

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })
    this.cartService.totalPrice.subscribe(data => {
      this.totalAmount = +data.toFixed(2);;
    })
  }
}
