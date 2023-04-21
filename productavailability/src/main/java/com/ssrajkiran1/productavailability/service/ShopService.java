package com.ssrajkiran1.productavailability.service;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.ssrajkiran1.productavailability.model.repo.ShopModel;;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShopService {



    @Autowired
    private ShopRepository shopRepository;


    public BaseResponseModel<List> getAllShops() {
        BaseResponseModel<List> resp = new BaseResponseModel<>();
        List<ShopModel> shop_data = shopRepository.findAll();

        if (shop_data.isEmpty()){

            resp.setStatusCode(HttpStatus.OK.value());
            resp.setStatus(false);
            resp.setError("Shop DatabaseEmpty");
            resp.setMessage("No Record Shop");
            resp.getData();

        }
        else{


            List<Object> dataList = new ArrayList<>();
            for(ShopModel user : shop_data){
                dataList.add(new ShopModel(user.getUserId(),user.getId(),user.getShopName(),user.getAddresses()));
            }
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("List of Shop Database");
            resp.setData(dataList);

        }
        return  resp;
    }


    public BaseResponseModel<ShopModel> deleteShopById(String id) {
        Optional<ShopModel> getId = shopRepository.findById(id);
        if (getId.isEmpty()) {

            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus(false);
            resp.setError("Shop Not Found");
            resp.setMessage("Shop not deleted!");
            return resp;

        } else {
            shopRepository.deleteById(id);
            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("Successfully Account deleted!");
            return resp;
        }
    }



    public BaseResponseModel<ShopModel> saveShop(ShopModel shopDetails) {
        Optional<ShopModel> shopModelOpt = shopRepository.findByShopName(shopDetails.getShopName());

        if (shopModelOpt.isEmpty()) {
            shopRepository.save(shopDetails);


            ShopModel data = shopRepository.getByShopName(shopDetails.getShopName());

            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.value());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("Shop Created Successfully");
            resp.setData(data);

            return resp;

        } else {
            BaseResponseModel<ShopModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.value());
            resp.setStatus(true);
            resp.setError("ShopIdExists");
            resp.setMessage("Shop Already Exists");

            return resp;


        }
    }



}
