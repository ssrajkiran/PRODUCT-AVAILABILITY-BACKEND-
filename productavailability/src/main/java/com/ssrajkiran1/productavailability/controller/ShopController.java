package com.ssrajkiran1.productavailability.controller;

import com.ssrajkiran1.productavailability.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.repo.ShopModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;

import java.util.List;

@RestController
public class ShopController extends BaseController{
    @Autowired
    public ShopService shopService;

    @PostMapping("/createshop")
    public BaseResponseModel<ShopModel> createShop(@RequestBody ShopModel shopDetails) {

        return shopService.saveShop(shopDetails);
    }


    @GetMapping("/listshops")
    public BaseResponseModel<List> getAllShops() {

        return shopService.getAllShops();
    }



//    @DeleteMapping("/deleteshops")
//    public BaseResponseModel<ShopModel> deleteShopById(@PathVariable String id) {
//        return shopService.deleteShopById(id);
//
//    }


}

