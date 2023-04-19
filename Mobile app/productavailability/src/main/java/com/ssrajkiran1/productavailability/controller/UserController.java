package com.ssrajkiran1.productavailability.controller;


import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import com.ssrajkiran1.productavailability.model.request.UserRequestModel;
import com.ssrajkiran1.productavailability.model.response.UserResponseModel;
import com.ssrajkiran1.productavailability.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController extends BaseController{
    @Autowired
    public UserService userService;


    @PostMapping("/user")
    @PreAuthorize("hasAnyAuthority('ROOT')")
    public BaseResponseModel<UserResponseModel> createUser(@RequestBody UserRequestModel user) {
        return userService.save(user);
    }

    @GetMapping("/user")
    public BaseResponseModel<List<UserResponseModel>> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public BaseResponseModel<UserResponseModel> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasAnyAuthority('ROOT')")
    public BaseResponseModel<UserRepoModel> deleteUserById(@PathVariable String id) {
        return userService.deleteUserById(id);
    }

}

