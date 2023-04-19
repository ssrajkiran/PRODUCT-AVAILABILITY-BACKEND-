package com.ssrajkiran1.productavailability.service;


import com.ssrajkiran1.productavailability.model.*;

import com.ssrajkiran1.productavailability.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShopService {



    @Autowired
    private ShopRepository shopRepository;


    public BaseResponseModel<ShopModel> getAllShops() {
        BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
        List<ShopModel> shop_data = shopRepository.findAll();

        if (shop_data.isEmpty()){

            resp.setStatusCode(HttpStatus.OK.value());
            resp.setStatus("False");
            resp.setError("Database Empty Error");
            resp.setMessage("Database is empty");
            resp.getData();

        }
        else{
            List<Object> data = new ArrayList<>();

            for(ShopModel user : shop_data){
                data.add(new ShopModel(user.getId(),user.getShopName(),user.getAddresses()));
            }
            data.add(new ProductModel());
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("Shop Database");
            resp.setData(data);

        }
        return  resp;
    }


    public BaseResponseModel<UserModel> deleteShopById(String id) {
        Optional<ShopModel> getId = shopRepository.findById(id);
        if (getId.isEmpty()) {

            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("Shop Not Found");
            resp.setMessage("Shop not deleted!");
            return resp;

        } else {
            shopRepository.deleteById(id);
            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("Successfully Account deleted!");
            return resp;
        }
    }



    public BaseResponseModel<ShopModel> saveShop(ShopModel shopDetails) {
        Optional<ShopModel> shopModelOpt = shopRepository.findByShopName(shopDetails.getShopName());

        if (shopModelOpt.isEmpty()) {
            shopRepository.save(shopDetails);


            List<Object> data = shopRepository.getByShopName(shopDetails.getShopName());

            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("User Account Fetched Successfully");
            resp.setData(data);

            return resp;

        } else {
            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("User Aldready Exists");
            resp.setMessage("User data Aldready Found!");

            return resp;


        }
    }



}
