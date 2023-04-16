package com.ssrajkiran1.productavailability.controller;


import com.ssrajkiran1.productavailability.model.mobile.ProductResponseModel;
import com.ssrajkiran1.productavailability.model.mobile.ShopResponseModel;
import com.ssrajkiran1.productavailability.service.MobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mobile")
public class MobileController {
    @Autowired
    private MobileService service;


    @GetMapping("/shop")
    public List<ShopResponseModel> getProductionShop() {
        return service.getProductionShop();
    }

    @GetMapping("/shop/{shopName}")
    public ShopResponseModel createShop(@PathVariable String shopName) {

        return service.getShop(shopName);
    }


    @GetMapping("/product/{productname}")
    public ProductResponseModel showshop(@PathVariable String productname) {

        return service.getProduct(productname);
    }


}
