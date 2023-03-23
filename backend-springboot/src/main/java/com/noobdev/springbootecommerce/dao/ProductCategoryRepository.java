package com.noobdev.springbootecommerce.dao;

import com.noobdev.springbootecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
//productCategory: Name of JSON entity
// route: /product-category
//JpaRepository<ProductCategory, Long>
// extends JPA Repository type PropertyCategory, key type is Long
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
