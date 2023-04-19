package com.ssrajkiran1.productavailability.service;

import com.ssrajkiran1.productavailability.controller.BaseController;
import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.repo.ShopModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
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

    public BaseResponseModel<Object> getShop(String shopName, String shop_id) {
        Optional<ShopModel> shopModelOpt = shopRepository.findByShopNameAndId(shopName, shop_id);

        BaseResponseModel<Object> resp = new BaseResponseModel<>();

        if (shopModelOpt.isEmpty()) {
            resp.setStatusCode(HttpStatus.OK.value());
            resp.setStatus(true);
            resp.setError("Shop Not Found");
            resp.setMessage("Shop is not available!");
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
            resp.setMessage("List By Shop");
            resp.setData(merglist);
        }

        return resp;
    }


    public BaseResponseModel<Object> getProduct(String productName) {
        BaseResponseModel<Object> resp = new BaseResponseModel<>();

        List<ProductModel> product = productRepository.getByProductName(productName);
        log.info(product);
        if (product.isEmpty()) {
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("Product is not available in the shop");

        } else {
            List<String> shopIds = null;
            for (ProductModel p : product) {
                shopIds = product.stream().map(ProductModel::getShopId).collect(Collectors.toList());
                // Do something with the shopId value
            }
            log.info(shopIds);

            List<ShopModel> details = null;

            List<ShopModel> shop = shopRepository.getByIdIn(shopIds);

            log.info(shop);

            resp.setData(shop);
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus(true);
            resp.setError("");
            resp.setMessage("Database Fetched Successfully");


        }
        return resp;

    }


}
