package com.ssrajkiran1.productavailability.controller;


import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.repo.ShopModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.response.mobile.ProductResponseModel;
import com.ssrajkiran1.productavailability.model.response.mobile.ShopResponseModel;
import com.ssrajkiran1.productavailability.service.MobileService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/mobile")
public class MobileController  extends BaseController{
    @Autowired
    private MobileService service;



    @GetMapping("/shop")
    public BaseResponseModel<Object> getShop(@RequestParam String shopName,@RequestParam String id ) {
        System.out.println(id+""+ shopName);
        return service.getShop(shopName,id);
    }

        @GetMapping("/product/{productName}")
        BaseResponseModel<Object> getProduct(@PathVariable String productName) {
            return service.getProduct(productName);
        }


}
