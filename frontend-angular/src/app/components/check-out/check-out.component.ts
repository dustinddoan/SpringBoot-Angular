import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  constructor(private formBuilder: FormBuilder,
    private cartService: CartService) {}

  checkoutFormGroup: FormGroup;
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  totalQuantity: number = 0;

  ngOnInit() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]]
      }),
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      paymentMethod: this.formBuilder.group({
        cardType: ['', Validators.required],
        name: [''],
        cardNumber: [''],
        expirationMonth: [''],
        expirationYear: [''],
        securityCode: [''],
      }),
      reviewOrder: this.formBuilder.group({
        totalQuantity: [0, [Validators.required, Validators.min(0)]],
        totalPrice: [0, [Validators.required, Validators.min(0)]]
      })
    })

    this.reviewCartDetails();
  }

  handleCheckout() {
    console.log('checkout');
    console.log(this.checkoutFormGroup.value);
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })
    this.cartService.totalPrice.subscribe(data => {
      this.totalAmount = data;
    })

  }
}
