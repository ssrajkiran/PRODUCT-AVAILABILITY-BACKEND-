package com.ssrajkiran1.productavailability.model.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AuthModel {

    @JsonProperty("user_email")
    private String email;
    @JsonProperty("password")
    private String password;
}
