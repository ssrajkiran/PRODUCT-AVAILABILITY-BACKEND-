package com.ssrajkiran1.productavailability.controller;

import com.fasterxml.jackson.databind.ser.Serializers;
import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import com.ssrajkiran1.productavailability.model.request.UserRequestModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.response.UserResponseModel;
import com.ssrajkiran1.productavailability.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
public class UserController extends BaseController{
    @Autowired
    public UserService userService;


    @PostMapping("/createuser")
    public BaseResponseModel <UserResponseModel> createUser(@Valid @RequestBody UserRequestModel user) {
        return userService.save(user);
    }

    @GetMapping("/listuser")
    public BaseResponseModel<List<UserResponseModel>> getAllUsers() {
        return userService.getAllUsers();
    }

//    @GetMapping("/getuser")
//    public BaseResponseModel<UserResponseModel> getUserById(@RequestParam String id) {
//        return userService.getUserById(id);
//    }

//    @DeleteMapping("/deleteUser")
//    public BaseResponseModel<UserRepoModel> deleteUserById(@RequestParam String userid) {
//        System.out.println(userid);
//        return userService.deleteUserById(userid);
//    }
}

