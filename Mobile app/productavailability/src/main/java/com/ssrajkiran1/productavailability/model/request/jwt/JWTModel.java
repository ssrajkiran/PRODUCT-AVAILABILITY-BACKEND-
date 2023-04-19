package com.ssrajkiran1.productavailability.model.request.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import com.ssrajkiran1.productavailability.model.repo.UserRoles;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class JWTModel {


    @JsonProperty("auth_token")
    private String authToken;
    @JsonProperty("refresh_token")
    private String refreshToken;


    public JWTModel(String accessToken, String refreshToken) {
        this.authToken=accessToken;
        this.refreshToken=refreshToken;
    }


    public static void setEmail(String email) {
    }

    public static void setId(String id) {
    }

    public void setName(String username) {
    }
}
