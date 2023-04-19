package com.ssrajkiran1.productavailability.service;


import com.ssrajkiran1.productavailability.exception.ShopNotFoundException;
import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.ProductModel;
import com.ssrajkiran1.productavailability.model.ShopModel;
import com.ssrajkiran1.productavailability.model.mobile.ShopResponseModel;
import com.ssrajkiran1.productavailability.repository.ProductRepository;
import com.ssrajkiran1.productavailability.repository.ShopRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class MobileService {

    @Autowired
    public ShopRepository shopRepository;

    @Autowired
    private ProductRepository productRepository;

    public BaseResponseModel<ShopModel> getShop(String shopName) {
        Optional<ShopModel> shopModelOpt = shopRepository.findByShopName(shopName);
        BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();

        if (shopModelOpt.isEmpty()) {
            throw new ShopNotFoundException(String.format("Shop Name not found %s", shopName));
        }

        ShopModel shopModel = shopModelOpt.get();

        List<ProductModel> products = productRepository.getByShopIdIn(shopModel.getId());

        ShopResponseModel responseModel = new ShopResponseModel();
        responseModel.setId(shopModel.getId());
        responseModel.setShopName(shopModel.getShopName());
        //responseModel.setShopAddress(shopModel.getAddress());
        responseModel.setProducts(products);

        return resp;
    }


    public BaseResponseModel<ProductModel> getProduct(String productName) {
        BaseResponseModel<ProductModel> resp = new BaseResponseModel<>();
        System.out.println(productName);
        List<ProductModel> products = productRepository.findByProductName(productName);
        if(products.isEmpty()){
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("Product is not available in the shop");

        }else {
            List<String> shopIds = products.stream().map(ProductModel::getShopId).toList();
            if (shopIds.isEmpty()) {
                resp.setStatusCode(HttpStatus.OK.hashCode());
                resp.setStatus("True");
                resp.setError("");
                resp.setMessage("Shop is not available for the product");

            } else {
                List<ShopModel> shopModels = shopRepository.findByIdIn(shopIds);
                List<Object> dataList = new ArrayList<>();
                dataList.add(0, products.get(1).getProductName());
                dataList.add(shopModels);
                resp.setData(dataList);
                resp.setStatusCode(HttpStatus.OK.hashCode());
                resp.setStatus("True");
                resp.setError("");
                resp.setMessage("Database Fetched Successfully");
            }
        }
        return resp;
    }




}
