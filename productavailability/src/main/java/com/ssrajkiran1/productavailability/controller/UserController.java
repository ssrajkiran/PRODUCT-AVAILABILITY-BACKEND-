package com.ssrajkiran1.productavailability.controller;

import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import com.ssrajkiran1.productavailability.model.request.UserRequestModel;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.response.UserResponseModel;
import com.ssrajkiran1.productavailability.service.UserService;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class UserController extends BaseController {
    @Autowired
    public UserService userService;


    @PostMapping("/createuser")
    @PreAuthorize("hasAuthority('ROOT')")
    public BaseResponseModel<UserResponseModel> createUser(@RequestBody @Valid UserRequestModel user) {
        return userService.save(user);
    }

    @GetMapping("/listuser")
    public BaseResponseModel<List<UserResponseModel>> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getuser")
    public BaseResponseModel<UserResponseModel> getUserById(@RequestParam String id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/deleteUser")
    public BaseResponseModel<UserRepoModel> deleteUserById(@RequestBody @Valid Map<String, String> requestBody) {
        String userid = requestBody.get("user_id");
        if(StringUtils.isBlank(userid)){
            return new BaseResponseModel<>("Enter your user_id");
        }
        return userService.deleteUserById(userid);

    }
}

