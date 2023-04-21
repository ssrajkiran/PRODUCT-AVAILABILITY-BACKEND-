package com.ssrajkiran1.productavailability.controller;

import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestController
public class BaseController {
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public   Map<String,String> handleException(MethodArgumentNotValidException ex) {
        BaseResponseModel<Exception> brm = new BaseResponseModel<>(ex,ex.getMessage());
        Map<String,String> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->{
            errorMap.put(error.getField(),error.getDefaultMessage());
        });

        return errorMap;
    }

//    @ExceptionHandler(Throwable.class)
//    public BaseResponseModel<Object> handleThrowable(Throwable ep) {
//       BaseResponseModel response = new BaseResponseModel();
//       response.setData(ep.getMessage());
//       response.setError("Enter your User_id");
//       response.setStatusCode(HttpStatus.OK.value());
//        response.setStatus(true);
//        return response;
//    }


}
