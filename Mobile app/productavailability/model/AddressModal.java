package com.ssrajkiran1.productavailability.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AddressModal {

    @JsonProperty("latitude")
    private Double latitude;

    @JsonProperty("longitude")
    private Double longitude;



    public AddressModal(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

}
