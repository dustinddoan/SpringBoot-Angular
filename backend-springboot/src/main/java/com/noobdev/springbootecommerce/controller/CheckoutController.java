package com.noobdev.springbootecommerce.controller;

import com.noobdev.springbootecommerce.dto.Purchase;
import com.noobdev.springbootecommerce.dto.PurchaseResponse;
import com.noobdev.springbootecommerce.service.CheckoutService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
  private Logger logger = LoggerFactory.getLogger(CheckoutController.class);
  private CheckoutService checkoutService;

  @Autowired
  public CheckoutController(CheckoutService checkoutService) {
    this.checkoutService = checkoutService;
  }


  @PostMapping("/purchase")
  public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
    System.out.println(purchase);
    PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
    return purchaseResponse;
  }

}
