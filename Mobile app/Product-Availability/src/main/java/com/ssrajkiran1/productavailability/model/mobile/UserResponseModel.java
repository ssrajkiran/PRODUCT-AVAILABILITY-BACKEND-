package com.ssrajkiran1.productavailability.model.mobile;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;



@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseModel {

    private boolean authenticated;
    @JsonProperty("user_id")
    private String id;
    @JsonProperty("user_name")
    private String username;
    @JsonProperty("user_email")
    private String email;

}


