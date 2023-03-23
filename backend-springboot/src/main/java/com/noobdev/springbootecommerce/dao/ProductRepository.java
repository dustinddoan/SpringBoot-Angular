package com.noobdev.springbootecommerce.dao;

import com.noobdev.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

// dao : DATA ACCESS OBJECT
public interface ProductRepository extends JpaRepository<Product, Long> {
}
