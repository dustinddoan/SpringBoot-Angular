package com.noobdev.springbootecommerce.dao;

import com.noobdev.springbootecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// dao : DATA ACCESS OBJECT
//To create finder methods in Data JPA, we need to follow a certain naming convention.
// To create finder methods for the entity class field name, we need to create a method starting with findBy
// followed by field name. We can also apply Containing on the field names to filter the records that match
// the given text.
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    // SELECT * FROM Product p
    // WHERE p.name LIKE CONCAT('%',:name,'%')
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
