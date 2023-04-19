package com.ssrajkiran1.productavailability.model.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import com.ssrajkiran1.productavailability.model.request.jwt.JWTModel;
import com.ssrajkiran1.productavailability.model.response.mobile.ProductResponseModel;
import lombok.*;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class BaseResponseModel<T> {
    private String message;
    @JsonProperty("status_code")
    private int statusCode;
    private boolean status;
    private String error;
    private T data;

    public BaseResponseModel() {

    }

    public BaseResponseModel(T data,String Message) {
        this.message = Message;
        this.status = true;
        this.statusCode = HttpStatus.OK.value();
        this.data = data;
    }



}
