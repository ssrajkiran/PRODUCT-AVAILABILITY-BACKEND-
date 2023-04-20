package com.ssrajkiran1.productavailability.controller;


import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.response.mobile.ProductResponseModel;
import com.ssrajkiran1.productavailability.service.MobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/filterby")
public class MobileController  extends BaseController{
    @Autowired
    private MobileService service;



    @GetMapping("/shop")
    public BaseResponseModel<Object> getfilterbyShop(@RequestBody  Map<String, String> requestBody ) {
        String shopName = requestBody.get("shop_name");
        String id = requestBody.get("shop_id");
        System.out.println(shopName+""+id);
        return service.getfilterbyShop(shopName,id);
    }

        @GetMapping("/product")
        BaseResponseModel<ProductResponseModel> getProduct(@RequestBody  Map<String, String> requestBody) {
        String productName = requestBody.get("product_name");
            return service.getProduct(productName);
        }


}
