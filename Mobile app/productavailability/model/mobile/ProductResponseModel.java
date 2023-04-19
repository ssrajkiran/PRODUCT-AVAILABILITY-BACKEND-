package com.ssrajkiran1.productavailability.model.mobile;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssrajkiran1.productavailability.model.ShopModel;
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

    @JsonProperty("shop_details")
    List<ShopModel> shopDetails;

}
