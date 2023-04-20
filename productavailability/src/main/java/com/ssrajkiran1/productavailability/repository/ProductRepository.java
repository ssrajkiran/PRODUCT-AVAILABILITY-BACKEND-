package com.ssrajkiran1.productavailability.repository;


import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<ProductModel, String> {



    List<ProductModel> findByProductName(String productName);
    Optional<ProductModel> findByProductNameAndShopId(String productName, String shopId);



    ProductModel findByShopIdAndProductName(String shopId, String productName);

    List<ProductModel> getByShopIdAndProductName(String shopId, String productName);


    List<Object> getByShopId(String shopId);

   List<ProductModel> getByProductName(String productName);


    ProductModel getByProductNameIn(String productName);

    List<ProductModel> getByShopIdIn(String id);

    List<String> getShopIdsByProductName(String productName);

    List<ProductModel> findByIdAndBrandName(List<String> shopIds, List<String> brand);
}
