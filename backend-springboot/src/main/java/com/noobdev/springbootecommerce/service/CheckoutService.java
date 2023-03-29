package com.noobdev.springbootecommerce.service;

import com.noobdev.springbootecommerce.dto.Purchase;
import com.noobdev.springbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {
  PurchaseResponse placeOrder(Purchase purchase);
}
