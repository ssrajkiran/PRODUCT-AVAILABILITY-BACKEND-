package com.ssrajkiran1.productavailability.repository;


import com.ssrajkiran1.productavailability.model.ProductModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<ProductModel, String> {




    List<ProductModel> findByShopIdAndProductName(String shopId, String productName);



    List<ProductModel> getByShopIdIn(String id);

    






    Optional<ProductModel> findByProductNameAndShopId(String productName, String shopId);




    List<ProductModel> findByProductName(String productName);
}
