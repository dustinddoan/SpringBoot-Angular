import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Address } from 'src/app/common/address';
import { CartItem } from 'src/app/common/cart-item';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutServiceService } from 'src/app/services/checkout-service.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutServiceService) {}

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
    // if (this.checkoutFormGroup.invalid) {
    //   this.checkoutFormGroup.markAllAsTouched();
    //   return
    // }
    console.log(this.checkoutFormGroup.value);
    // setup order
    let order = new Order();
    order.totalPrice = this.totalAmount;
    order.totalQuantity = this.totalQuantity;

    // create orderItems from CartItems
    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = [];

    for (let item of cartItems) {
      orderItems.push(new OrderItem(item));
    }
    console.log(JSON.stringify(orderItems))

    // populate purchase - customer
    let customer = new Customer();
    customer.firstName = this.checkoutFormGroup.value.customer.firstName;
    customer.lastName = this.checkoutFormGroup.value.customer.lastName;
    customer.email = this.checkoutFormGroup.value.customer.email;

    // populate purchase - address
    let shippingAddress = new Address();
    shippingAddress.street = this.checkoutFormGroup.value.address.street;
    shippingAddress.city = this.checkoutFormGroup.value.address.city;
    shippingAddress.state = this.checkoutFormGroup.value.address.state;
    shippingAddress.zipCode = this.checkoutFormGroup.value.address.zip;

    let billingAddress = new Address();
    billingAddress.street = this.checkoutFormGroup.value.address.street;
    billingAddress.city = this.checkoutFormGroup.value.address.city;
    billingAddress.state = this.checkoutFormGroup.value.address.state;
    billingAddress.zipCode = this.checkoutFormGroup.value.address.zip;

  // call API
  // customer: Customer;
  // shippingAddress: Address;
  // billingAddress: Address;
  // order: Order;
  // orderItems: OrderItem[];

    // setup purchase
    let purchase = new Purchase();
    purchase.customer = customer;
    purchase.shippingAddress = shippingAddress;
    purchase.billingAddress = billingAddress;
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call API
    this.checkoutService.placeOrder(purchase).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
        this.resetCart();
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
  resetCart() {
    this.cartService.cartItems = []
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
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
