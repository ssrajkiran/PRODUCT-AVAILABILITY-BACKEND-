package com.ssrajkiran1.productavailability.controller;

import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@Log4j2
@RestController
public class BaseController {
    @ExceptionHandler({Exception.class})
    public BaseResponseModel<Exception> handleException(Exception ex) {
        BaseResponseModel<Exception> brm = new BaseResponseModel<>(ex,ex.getMessage());
        brm.setError(ex.getMessage());
        brm.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        brm.setStatus(false);
        log.error(String.format("Exception : %s", ex.getMessage()), ex);
        return brm;
    }

    @ExceptionHandler(Throwable.class)
    public BaseResponseModel<Throwable> handleThrowable(Throwable ex) {
        BaseResponseModel<Throwable> brm = new BaseResponseModel<>(ex, ex.getMessage());
        brm.setError(ex.getMessage());
        brm.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        brm.setStatus(false);
        log.error(String.format("Exception : %s", ex.getMessage()), ex);
        return brm;
    }
}
