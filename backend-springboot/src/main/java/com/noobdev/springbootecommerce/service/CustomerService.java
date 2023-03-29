package com.noobdev.springbootecommerce.service;

import org.springframework.stereotype.Service;

@Service
public class CustomerService {

  public void createCustomer(String name) {
    System.out.println("Creating customer " + name);
  }
}
