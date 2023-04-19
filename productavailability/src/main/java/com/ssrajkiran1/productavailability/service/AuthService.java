package com.ssrajkiran1.productavailability.service;

import com.ssrajkiran1.productavailability.controller.BaseController;
import com.ssrajkiran1.productavailability.model.repo.ProductModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.request.auth.AuthModel;
import com.ssrajkiran1.productavailability.model.request.jwt.JWTModel;
import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import com.ssrajkiran1.productavailability.security.JwtService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class AuthService {
    @Value("${jwt.secret}")
    private String jwtSecretKey;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;


    public BaseResponseModel<Object> auth(AuthModel authModel){

            try {
                Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authModel.getEmail(), authModel.getPassword()));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                User user = (User) authentication.getPrincipal();

                UserRepoModel urm = userService.findUserByEmail(authModel.getEmail());
                BaseResponseModel<JWTModel> resp = new BaseResponseModel<>();
                resp.setStatus(true);
                resp.setStatusCode(HttpStatus.OK.value());
                JWTModel token = jwtService.getJwt(urm);
                List<Object> data = new ArrayList<>();
                data.add(urm);
                data.add(token);
                return new BaseResponseModel<>(data,"User Login Successfully");

            }catch (BadCredentialsException e){
                BaseResponseModel<Object> resp = new BaseResponseModel<>();
                resp.setMessage("UserEmail or Password is invalid ");
                resp.setStatus(true);
                resp.setStatusCode(HttpStatus.OK.value());
                resp.setError(e.getMessage());
                return resp;
            }
    }
}


