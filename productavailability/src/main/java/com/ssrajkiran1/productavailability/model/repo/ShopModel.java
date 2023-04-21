package com.ssrajkiran1.productavailability.model.repo;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.bson.codecs.pojo.annotations.BsonId;
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

    @JsonProperty("user_id")
    @NotBlank(message = "Enter Your UserId")
    @NotNull(message = "UserId is mandatory")
    private String userId;

    @JsonProperty("shop_name")
    @NotBlank(message = "Enter Your ShopName")
    @NotNull(message = "UserName is mandatory")
    private String shopName;

    @JsonProperty("shop_address")
    @Valid
    private AddressModal addresses;

    public ShopModel(String userId, String shopId, String shopName, AddressModal addresses) {
        this.userId=userId;
        this.id = shopId;
        this.shopName = shopName;
        this.addresses = addresses;
    }



}
