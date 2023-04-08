package com.noobdev.springbootecommerce.service;

import com.noobdev.springbootecommerce.dto.PaymentInfo;
import com.noobdev.springbootecommerce.dto.Purchase;
import com.noobdev.springbootecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
  PurchaseResponse placeOrder(Purchase purchase);

  PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;

}
