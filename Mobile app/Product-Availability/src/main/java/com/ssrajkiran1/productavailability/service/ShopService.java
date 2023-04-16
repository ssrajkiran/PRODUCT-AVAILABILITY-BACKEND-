package com.ssrajkiran1.productavailability.service;


import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.ShopModel;
import com.ssrajkiran1.productavailability.model.UserModel;
import com.ssrajkiran1.productavailability.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

    public BaseResponseModel<ShopModel> getAllShops() {
        List<ShopModel> shop_data = shopRepository.findAll();

        if (shop_data.isEmpty()){
            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("Database Empty Error");
            resp.setMessage("Database is empty");
            resp.getData();
            return resp;
        }
        else{
            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            List<Object> dataList = new ArrayList<>();
            for(ShopModel user : shop_data){
                dataList.add(new ShopModel(user.getId(),user.getShopName(),user.getAddress()));
            }
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("Database Fetched Successfully");
            resp.setData(dataList);
            return  resp;
        }
    }


    public boolean shopExists(String id) {

        return shopRepository.existsById(id);
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

            List<Object> dataList = new ArrayList<>();
            ShopModel data = shopRepository.getByShopName(shopDetails.getShopName());

            dataList.add(new ShopModel(data.getId(),data.getShopName()));


            String address = shopDetails.getAddress();
            String[] strArray = address.split(",");
            List<String> strList = new ArrayList<>(Arrays.asList(strArray));

            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("User Account Fetched Successfully");
            resp.setData(dataList);
            resp.setAddress(strList);
            return resp;

        } else {
            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("User Aldready Exists");
            resp.setMessage("User data Aldready Found!");
            resp.getData();
            return resp;


        }
    }



}
