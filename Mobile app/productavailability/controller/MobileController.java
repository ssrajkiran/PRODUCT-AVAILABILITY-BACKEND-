package com.ssrajkiran1.productavailability.controller;


import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.ProductModel;
import com.ssrajkiran1.productavailability.model.ShopModel;
import com.ssrajkiran1.productavailability.model.mobile.ShopResponseModel;
import com.ssrajkiran1.productavailability.service.MobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mobile")
public class MobileController {
    @Autowired
    private MobileService service;


    @GetMapping("/product/{productName}")
    public BaseResponseModel<ProductModel> getProduct(@PathVariable String productName) {
        return service.getProduct(productName);
    }

    @GetMapping("/shop/{shopName}")
    public BaseResponseModel<ShopModel> getShop(@PathVariable String shopName) {

        return service.getShop(shopName);
    }



}
