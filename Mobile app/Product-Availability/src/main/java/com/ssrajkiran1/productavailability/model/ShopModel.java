package com.ssrajkiran1.productavailability.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.bson.codecs.pojo.annotations.BsonId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "shop")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ShopModel {

    @BsonId
    @JsonProperty("shop_id")
    private String id;
    @JsonProperty("shop_name")
    private String shopName;

    @JsonProperty("shop_address")
    private String Address;



    public ShopModel(String id, String shopName) {
        this.id =id;
        this.shopName =shopName;
    }

    public ShopModel(String address) {
        this.Address = address;
    }
}
