package com.ssrajkiran1.productavailability.model.repo;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank(message = "Enter Your shopId")
    @NotNull(message = "ShopId is mandatory")
    private String shopId;

    @JsonProperty("product_name")
    @NotBlank(message = "Enter Your ProductName")
    @NotNull(message = "ProductName is mandatory")
    private String productName;

    @JsonProperty("product_description")
    @NotBlank(message = "Enter Your ProductDescription")
    @NotNull(message = "ProductDescription is mandatory")
    private String productDescription;

    @JsonProperty("brand_name")
    @NotBlank(message = "Enter Your BrandName")
    @NotNull(message = "BrandName is mandatory")
    private String brandName;

    @JsonProperty("product_availability")
    @NotNull(message = "ProductAvailability is mandatory")
    private int productAvailability;

    public ProductModel(String productName, String brandName, String productDescription) {
        this.productName =productName;
        this.brandName =brandName;
        this.productDescription=productDescription;
    }


    public void setId(String id) {
        this.shopId = id;
    }


}
