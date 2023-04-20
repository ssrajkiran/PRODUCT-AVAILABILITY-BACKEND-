package com.ssrajkiran1.productavailability.model.repo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.apache.logging.log4j.core.config.plugins.validation.constraints.NotBlank;
import org.bson.codecs.pojo.annotations.BsonId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.List;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "user")
public class UserRepoModel {

    @BsonId
    @JsonProperty("user_id")
    private String id;
    @JsonProperty("user_name")
    private String username;
    @JsonProperty("user_email")

    private String email;
    @JsonProperty("password")

    private String password;

    private List<UserRoles> userRoles;

}