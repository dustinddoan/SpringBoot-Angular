package com.noobdev.springbootecommerce.dao;

import com.noobdev.springbootecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

//@RepositoryRestResource -  DO NOT EXPOSE THIS CLASS http://localhsot:8000/api/customers
public interface  CustomerRepository extends JpaRepository<Customer, Long> {
  Customer findByEmail(String email);
}
