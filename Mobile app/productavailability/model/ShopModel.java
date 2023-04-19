package com.ssrajkiran1.productavailability.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.bson.codecs.pojo.annotations.BsonId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "shop")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ShopModel {


    @BsonId
    @JsonProperty("shop_id")
    private String id;
    @JsonProperty("shop_name")
    private String shopName;

    @JsonProperty("shop_address")
    private AddressModal addresses;


  public ShopModel(String shopId, String shopName, AddressModal addresses) {
       this.id = shopId;
       this.shopName = shopName;
       this.addresses = addresses;
    }





}
