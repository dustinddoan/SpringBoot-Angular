package com.noobdev.springbootecommerce.service;

import com.noobdev.springbootecommerce.dao.CustomerRepository;
import com.noobdev.springbootecommerce.dto.Purchase;
import com.noobdev.springbootecommerce.dto.PurchaseResponse;
import com.noobdev.springbootecommerce.entity.Customer;
import com.noobdev.springbootecommerce.entity.Order;
import com.noobdev.springbootecommerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{
  private CustomerRepository customerRepository;

  @Autowired
  public CheckoutServiceImpl(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }
  @Override
  @Transactional
  public PurchaseResponse placeOrder(Purchase purchase) {
    System.out.println(purchase);
//     retrieve the order info from dto
    Order order = purchase.getOrder();

    // generate tracking number
    String trackingNumber = generateTrackingNumber();
    order.setOrderTrackingNumber(trackingNumber);

    // populate order with orderItems
    Set<OrderItem> orderItems = purchase.getOrderItems();
    orderItems.forEach(item -> order.addOrderItem(item));

    // populate order with billing address and shipping address
    order.setBillingAddress(purchase.getBillingAddress());
    order.setShippingAddress(purchase.getShippingAddress());

    // populate Customer with order info
    Customer customer = purchase.getCustomer();

    //check if customer exists
    String theEmail = customer.getEmail();

    Customer existingCustomer = customerRepository.findByEmail(theEmail);

    if (existingCustomer!= null) {
      customer = existingCustomer;
    }

    customer.addOrder(order);

    // save to database
    customerRepository.save(customer);

    // return a response
    return new PurchaseResponse(trackingNumber);
  }

  private String generateTrackingNumber() {
    // generate a random tracking number UUID-4
    return UUID.randomUUID().toString();
  }
}
