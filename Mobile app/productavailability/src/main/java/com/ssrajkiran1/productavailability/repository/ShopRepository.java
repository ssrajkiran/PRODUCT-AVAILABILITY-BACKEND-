package com.ssrajkiran1.productavailability.repository;


import com.ssrajkiran1.productavailability.model.repo.ShopModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ShopRepository extends MongoRepository<ShopModel, String> {

    Optional<ShopModel> findByShopName(String shopName);




    ShopModel getByShopName(String shopName);


    ShopModel findByIdIn(List<String> shopIds);

    Optional<ShopModel> findByShopNameAndId(String shopName, String shopId);

    List<ShopModel> getByIdIn(List<String> shopIds);
}
