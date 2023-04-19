package com.ssrajkiran1.productavailability.model.response.mobile;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import lombok.*;

import java.util.List;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ShopResponseModel {

    @JsonProperty("shop_id")
    private String id;


    @JsonProperty("shop_name")
    private String shopName;


    @JsonProperty("shop_address")
    private String shopAddress;
    private List<ProductModel> products;


}
