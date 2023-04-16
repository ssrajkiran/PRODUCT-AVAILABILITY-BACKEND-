package com.ssrajkiran1.productavailability.model.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class JWTModel {
    @JsonProperty("auth_token")
    private String authToken;
    @JsonProperty("refresh_token")
    private String refreshToken;


}
