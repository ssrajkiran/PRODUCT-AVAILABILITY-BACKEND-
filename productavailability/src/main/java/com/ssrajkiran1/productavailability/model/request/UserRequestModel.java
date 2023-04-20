package com.ssrajkiran1.productavailability.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestModel {

    @JsonProperty("user_name")

    private String username;
    @JsonProperty("user_email")

    private String email;
    @JsonProperty("password")

    private String password;
}
