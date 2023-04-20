package com.ssrajkiran1.productavailability.model.response.mobile;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssrajkiran1.productavailability.model.repo.AddressModal;
import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.repo.ShopModel;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseModel {
    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("Brand_Name")
    private String BrandName;

    @JsonProperty("shop_details")
    List<ShopModel> shopDetails;


    public ProductResponseModel(List<ShopModel> shop, String productName, List<String> brandName) {
        this.shopDetails = shop;
        for (String name : brandName) {
            this.BrandName=name;
        }
        this.productName=productName;
    }
}
