package com.ssrajkiran1.productavailability.controller;


import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.auth.AuthModel;
import com.ssrajkiran1.productavailability.model.jwt.JWTModel;
import com.ssrajkiran1.productavailability.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuthController {


    @Autowired
    private AuthService authService;

    @PostMapping("/auth")
    public BaseResponseModel<JWTModel> authUser(@RequestBody AuthModel authModel){

        return authService.authenticate(authModel);

    }

    @PostMapping("/decode")
    public BaseResponseModel<List<JWTModel>> decode(@RequestHeader("Token") String decode_tokens){
        return  authService.decode(decode_tokens);
    }

}
