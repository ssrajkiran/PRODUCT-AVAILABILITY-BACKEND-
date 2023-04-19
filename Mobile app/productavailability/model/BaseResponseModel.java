package com.ssrajkiran1.productavailability.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BaseResponseModel<T> {
    private String message;
    @JsonProperty("status_code")
    private int statusCode;
    private String status;
    private String error;
    private List<Object> data;
    private  T authentication_services;


}
