package com.ssrajkiran1.productavailability.controller;

import com.ssrajkiran1.productavailability.service.ShopService;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.ssrajkiran1.productavailability.model.repo.ShopModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;

import java.util.List;
import java.util.Map;

@RestController
public class ShopController extends BaseController{
    @Autowired
    public ShopService shopService;

    @PostMapping("/createshop")
    public BaseResponseModel<ShopModel> createShop(@RequestBody @Valid ShopModel shopDetails) {

        return shopService.saveShop(shopDetails);
    }


    @GetMapping("/listshops")
    public BaseResponseModel<List> getAllShops() {

        return shopService.getAllShops();
    }



    @DeleteMapping("/deleteshop")
    public BaseResponseModel<ShopModel> deleteShopById(@RequestBody @Valid Map<String, String> requestBody)  {
        String shopId = requestBody.get("shop_id");
        if(StringUtils.isBlank(shopId)){
            return new BaseResponseModel<>("Enter your ShopId");
        }
        return shopService.deleteShopById(shopId);

    }


}

