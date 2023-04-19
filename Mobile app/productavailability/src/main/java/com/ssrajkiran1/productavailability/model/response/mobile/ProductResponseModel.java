package com.ssrajkiran1.productavailability.model.response.mobile;


import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty("shop_details")
    List<ShopModel> shopDetails;

}
