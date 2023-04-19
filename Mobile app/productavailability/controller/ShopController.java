package com.ssrajkiran1.productavailability.controller;

import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.ShopModel;
import com.ssrajkiran1.productavailability.model.UserModel;
import com.ssrajkiran1.productavailability.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ShopController {
    @Autowired
    public ShopService shopService;

    @PostMapping("/shops")
    public BaseResponseModel<ShopModel> createShop(@RequestBody ShopModel shopDetails) {

        return shopService.saveShop(shopDetails);
    }


    @GetMapping("/shops")
    public BaseResponseModel<ShopModel> getAllShops() {

        return shopService.getAllShops();
    }



    @DeleteMapping("/shops/{id}")
    public BaseResponseModel<UserModel> deleteShopById(@PathVariable String id) {
        return shopService.deleteShopById(id);

    }


}

