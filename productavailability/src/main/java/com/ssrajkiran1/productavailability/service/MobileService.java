package com.ssrajkiran1.productavailability.service;

import com.ssrajkiran1.productavailability.controller.BaseController;
import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.repo.ShopModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.response.mobile.ProductResponseModel;
import com.ssrajkiran1.productavailability.repository.ProductRepository;
import com.ssrajkiran1.productavailability.repository.ShopRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
@Log4j2
public class MobileService extends BaseController {

    @Autowired
    public ShopRepository shopRepository;

    @Autowired
    private ProductRepository productRepository;

    private ProductModel productModel;

    public BaseResponseModel<Object> getfilterbyShop(String shopName, String shop_id) {
        Optional<ShopModel> shopModelOpt = shopRepository.findByShopNameAndId(shopName, shop_id);

        BaseResponseModel<Object> resp = new BaseResponseModel<>();

        if (shopModelOpt.isEmpty()) {
            resp.setStatusCode(HttpStatus.OK.value());
            resp.setStatus(true);
            resp.setError("ShopIdError");
            resp.setMessage("Shop Data not Available");
        } else {

            List<Object> productDetails = productRepository.getByShopId(shop_id);
            List<Object> merglist = new ArrayList<>();
            Map<String, Object> data = new HashMap<>();
            data.put("Shop Id", shop_id);
            data.put("Shop Name", shopName);
            data.put("Product Details", productDetails);
            merglist.add(data);

            resp.setStatusCode(HttpStatus.OK.value());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("Available Product in Shop");
            resp.setData(merglist);
        }

        return resp;
    }


    public BaseResponseModel<ProductResponseModel> getProduct(String productName) {
        BaseResponseModel<ProductResponseModel> resp = new BaseResponseModel<>();

        List<ProductModel> product = productRepository.getByProductName(productName);


        if (product.isEmpty()) {
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("Product is not available in the shop");

        } else {
            List<String> shopIds = null;
            for (ProductModel p : product) {
                shopIds = product.stream().map(ProductModel::getShopId).collect(Collectors.toList());
            }
            List<String> brandname = null;
            for (ProductModel p : product) {
                brandname = product.stream().map(ProductModel::getBrandName).collect(Collectors.toList());
            }

            List<ShopModel> shop = shopRepository.getByIdIn(shopIds);


            ProductResponseModel merge= new ProductResponseModel();
            merge = new ProductResponseModel(shop,productName,brandname);


            resp.setData(merge);
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("Database Fetched Successfully");


        }
        return resp;

    }



}
