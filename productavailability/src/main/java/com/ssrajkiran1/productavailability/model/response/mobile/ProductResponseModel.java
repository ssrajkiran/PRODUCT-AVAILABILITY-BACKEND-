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

    @JsonProperty("Product_description")
    private String productDescription;

    @JsonProperty("shop_details")
    ShopModel shopDetails;


    public ProductResponseModel(String brandName, ShopModel s,String ProductName,String ProductDescription) {
        this.BrandName = brandName;
        this.shopDetails=s;
        this.productName=ProductName;
        this.productDescription=ProductDescription;
    }
}
