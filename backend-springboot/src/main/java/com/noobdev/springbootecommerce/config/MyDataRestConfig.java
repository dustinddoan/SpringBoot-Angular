package com.noobdev.springbootecommerce.config;

import com.noobdev.springbootecommerce.entity.Order;
import com.noobdev.springbootecommerce.entity.Product;
import com.noobdev.springbootecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Value("${allowed.origins}")
    private String[] allowedOrigins;


    private EntityManager entityManager;

    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

        // disable PUT, POST, DELETE Http methods for Product
//        config.getExposureConfiguration()
//                .forDomainType(Product.class)
//                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
//                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
//
//        // disable PUT, POST, DELETE Http methods for ProductCategory
//        config.getExposureConfiguration()
//                .forDomainType(ProductCategory.class)
//                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
//                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

        // call an internal method to expose id
        exposeIds(config);

        // config cors mapping
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(allowedOrigins);

        // disable HTTP methods for ProductCategory
        disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMethods(Product.class, config, theUnsupportedActions);
        disableHttpMethods(Order.class, config, theUnsupportedActions);

    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
            .forDomainType(theClass)
            .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
            .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // get list of all entity class from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create an array of entity types
        List<Class> entityClasses = new ArrayList<Class>();

        // get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        // expose the entity ids for the array of entity/domain types
        config.exposeIdsFor(domainTypes);

        // shortcut
//        Class[] classes = entityManager.getMetamodel().getEntities().stream().map(EntityType::getJavaType).toArray(Class[]::new);
//        config.exposeIdsFor(classes);
    }
}
