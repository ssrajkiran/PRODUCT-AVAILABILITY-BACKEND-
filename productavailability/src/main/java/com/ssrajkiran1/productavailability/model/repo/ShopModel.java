package com.ssrajkiran1.productavailability.model.repo;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.bson.codecs.pojo.annotations.BsonId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "shop")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ShopModel {

    @BsonId
    @JsonProperty("shop_id")
    private String id;

    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("shop_name")
    private String shopName;

    @JsonProperty("shop_address")
    private AddressModal addresses;


    public ShopModel(String userId, String shopId, String shopName, AddressModal addresses) {
        this.userId=userId;
        this.id = shopId;
        this.shopName = shopName;
        this.addresses = addresses;
    }
}
