package com.ssrajkiran1.productavailability.model.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class JWTDecode {
    @JsonProperty("email")
    public String email;

    @JsonProperty("id")
    public String id;


}
