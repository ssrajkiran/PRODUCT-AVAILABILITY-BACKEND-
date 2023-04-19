package com.ssrajkiran1.productavailability.controller;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.request.auth.AuthModel;
import com.ssrajkiran1.productavailability.model.request.jwt.JWTModel;
import com.ssrajkiran1.productavailability.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController extends BaseController{

    @Autowired
    private AuthService authService;

    @PostMapping("/auth")
    public BaseResponseModel<Object> authUser(@RequestBody AuthModel authModel) {
        return authService.auth(authModel);
    }

}
