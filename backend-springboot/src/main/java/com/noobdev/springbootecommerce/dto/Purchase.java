package com.noobdev.springbootecommerce.dto;

import com.noobdev.springbootecommerce.entity.Address;
import com.noobdev.springbootecommerce.entity.Customer;
import com.noobdev.springbootecommerce.entity.Order;
import com.noobdev.springbootecommerce.entity.OrderItem;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Data
@Getter
@Setter
public class Purchase {
  private Customer customer;
  private Address billingAddress;
  private Address shippingAddress;
  private Order order;
  private Set<OrderItem> orderItems;
}