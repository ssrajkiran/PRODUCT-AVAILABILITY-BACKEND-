package com.ssrajkiran1.productavailability.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestModel {

    @JsonProperty("user_name")
    @NotBlank(message = "Enter Your UserName")
    @NotNull(message = "UserName is mandatory")
    private String username;

    @JsonProperty("user_email")
    @NotBlank(message = "Enter Your Email")
    @Email(message = "Not Valid EmailId")
    private String email;


    @NotBlank(message = "Enter Your Password")
    @NotNull(message = "Password is mandatory")
    @NotBlank
    @JsonProperty("password")
    private String password;
}
