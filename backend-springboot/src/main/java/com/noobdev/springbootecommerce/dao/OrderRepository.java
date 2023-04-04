package com.noobdev.springbootecommerce.dao;

import com.noobdev.springbootecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {
  Page<Order> findByCustomerEmailOrderByDateCreatedDesc(@Param("email") String email, Pageable pageable);
}
// will execute
//SELECT * FROM orders
//LEFT JOIN customers ON orders.customer_id = customers.id
//WHERE customers.email = :email
