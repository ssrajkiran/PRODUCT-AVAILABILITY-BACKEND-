package com.ssrajkiran1.productavailability.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseController {

    @GetMapping("/apple")
    public String getBase() {
        return "hello";
    }
}
