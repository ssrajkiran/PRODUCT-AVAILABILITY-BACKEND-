package com.ssrajkiran1.productavailability.service;


import com.ssrajkiran1.productavailability.exception.ShopNotFoundException;
import com.ssrajkiran1.productavailability.model.ProductModel;
import com.ssrajkiran1.productavailability.model.ShopModel;
import com.ssrajkiran1.productavailability.model.mobile.ProductResponseModel;
import com.ssrajkiran1.productavailability.model.mobile.ShopResponseModel;
import com.ssrajkiran1.productavailability.repository.ProductRepository;
import com.ssrajkiran1.productavailability.repository.ShopRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class MobileService {

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ProductRepository productRepository;

    public ShopResponseModel getShop(String shopName) {
        Optional<ShopModel> shopModelOpt = shopRepository.findByShopName(shopName);

        if (shopModelOpt.isEmpty()) {
            throw new ShopNotFoundException(String.format("Shop Name not found %s", shopName));
        }

        ShopModel shopModel = shopModelOpt.get();

        List<ProductModel> products = productRepository.findByShopId(shopModel.getId());

        ShopResponseModel responseModel = new ShopResponseModel();
        responseModel.setId(shopModel.getId());
        responseModel.setShopName(shopModel.getShopName());
        responseModel.setShopAddress(shopModel.getAddress());
        responseModel.setProducts(products);

        return responseModel;
    }


    public ProductResponseModel getProduct(String productName) {

        List<ProductModel> products = productRepository.findByProductName(productName);

        List<String> shopIds = products.stream().map(ProductModel::getShopId).toList();

        List<ShopModel> shopModels = shopRepository.findByIdIn(shopIds);

        ProductResponseModel responseModel = new ProductResponseModel();
        responseModel.setProductName(productName);
        responseModel.setShopDetails(shopModels);

        return responseModel;
    }

    public List<ShopResponseModel> getProductionShop() {
        List<ShopModel> shops = shopRepository.findAll();
        List<ShopResponseModel> shopResponseModels = new ArrayList<>();

        for (ShopModel shopModel : shops) {
            List<ProductModel> products = productRepository.findByShopId(shopModel.getId());
            ShopResponseModel shopResponseModel = new ShopResponseModel();
            shopResponseModel.setId(shopModel.getId());
            shopResponseModel.setShopName(shopModel.getShopName());
            shopResponseModel.setShopAddress(shopModel.getAddress());
            shopResponseModel.setProducts(products);
            shopResponseModels.add(shopResponseModel);
        }

        return shopResponseModels;
    }


}
