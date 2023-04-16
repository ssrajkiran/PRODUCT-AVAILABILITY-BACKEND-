package com.ssrajkiran1.productavailability.controller;


import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.UserModel;
import com.ssrajkiran1.productavailability.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    public UserService userService;


    @PostMapping("/user")
    public BaseResponseModel<UserModel> createUser(@RequestBody UserModel user) {
         return  userService.save(user);

    }

    @GetMapping("/user")
    public BaseResponseModel<UserModel> getAllShops() {
        return userService.getAllShops();
    }

    @DeleteMapping("/user/{id}")
    public BaseResponseModel<UserModel> deleteShopById(@PathVariable String id) {
        return userService.deleteShopById(id);

    }

    @GetMapping("/user/{id}")
    public BaseResponseModel<UserModel> getById(@PathVariable String id) {
        return userService.getById(id);

    }

}

