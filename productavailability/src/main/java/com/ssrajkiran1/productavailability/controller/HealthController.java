package com.ssrajkiran1.productavailability.controller;

import com.ssrajkiran1.productavailability.model.response.StatusResponseModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController extends  BaseController{


    @GetMapping("/healthz")
    public StatusResponseModel getHealth() {
        return new StatusResponseModel("success");
    }
}
