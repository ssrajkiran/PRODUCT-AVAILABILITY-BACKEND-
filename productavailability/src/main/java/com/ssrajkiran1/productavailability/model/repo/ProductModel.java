package com.ssrajkiran1.productavailability.model.repo;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "product")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductModel {

    @JsonProperty("shop_id")
    private String shopId;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("product_description")
    private String productDescription;

    @JsonProperty("brand_name")
    private String brandName;

    @JsonProperty("product_availability")
    private int productAvailability;


    public void setId(String id) {
        this.shopId = id;
    }


}
