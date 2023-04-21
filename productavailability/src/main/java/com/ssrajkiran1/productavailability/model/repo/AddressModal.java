package com.ssrajkiran1.productavailability.model.repo;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AddressModal {

        @JsonProperty("latitude")
        @NotNull(message = "latitude is mandatory")
        private Double latitude;

        @JsonProperty("longitude")
        @NotNull(message = "longitude is mandatory")
        private Double longitude;



        public AddressModal(double latitude, double longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }


}
