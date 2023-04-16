package com.ssrajkiran1.productavailability.repository;


import com.ssrajkiran1.productavailability.model.ShopModel;
import com.ssrajkiran1.productavailability.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ShopRepository extends MongoRepository<ShopModel, String> {

    Optional<ShopModel> findByShopName(String shopName);

    List<ShopModel> findByIdIn(List<String> shopIds);


    ShopModel getByShopName(String shopName);
}
