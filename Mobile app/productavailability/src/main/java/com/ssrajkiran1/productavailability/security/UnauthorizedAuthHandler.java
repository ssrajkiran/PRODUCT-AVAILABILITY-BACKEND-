package com.ssrajkiran1.productavailability.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;



@Log4j2
public class UnauthorizedAuthHandler implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {


        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        BaseResponseModel<String> brm = new BaseResponseModel<>(null,authException.getMessage());

        brm.setStatus(false);
        brm.setError("Unauthorized");
        brm.setStatusCode(HttpServletResponse.SC_UNAUTHORIZED);

        final ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), brm);
    }
}
