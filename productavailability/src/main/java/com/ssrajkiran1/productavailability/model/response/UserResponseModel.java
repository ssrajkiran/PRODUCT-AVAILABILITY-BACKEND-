package com.ssrajkiran1.productavailability.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import lombok.*;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseModel {

    @JsonProperty("user_id")
    private String id;
    @JsonProperty("user_name")
    private String username;
    @JsonProperty("user_email")
    private String email;

    public UserResponseModel(UserRepoModel urm) {
        this.id = urm.getId();
        this.username = urm.getUsername();
        this.email = urm.getEmail();
    }
}
