package com.noobdev.springbootecommerce.controller;

import com.noobdev.springbootecommerce.entity.Order;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class OrderController {
  @GetMapping(value = "/orders")
  public Order privateEndpoint() {
    return null;
  }
}
