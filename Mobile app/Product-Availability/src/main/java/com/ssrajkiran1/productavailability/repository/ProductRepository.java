package com.ssrajkiran1.productavailability.repository;


import com.ssrajkiran1.productavailability.model.ProductModel;
import com.ssrajkiran1.productavailability.model.ShopModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<ProductModel, String> {


    List<ProductModel> findByShopId(String shopId);

    List<ProductModel> findByProductName(String productname);


    List<ProductModel> findByShopIdAndProductName(String shopId, String productName);
}
