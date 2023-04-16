package com.ssrajkiran1.productavailability.service;

import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.UserModel;
import com.ssrajkiran1.productavailability.model.auth.AuthModel;
import com.ssrajkiran1.productavailability.model.jwt.JWTDecode;
import com.ssrajkiran1.productavailability.model.jwt.JWTModel;
import com.ssrajkiran1.productavailability.repository.UserRepository;
import io.jsonwebtoken.*;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;

import java.util.*;

@Service
@Log4j2
public class AuthService {
    @Value("${jwt.secret}")
    private String jwtSecretKey;


    @Autowired
    private UserRepository userRepository;

    public BaseResponseModel<JWTModel> authenticate(AuthModel authModel) {
        Optional<UserModel> user = userRepository.findByEmail(authModel.getEmail());

        if (user.isEmpty()) {

            BaseResponseModel<JWTModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.NOT_FOUND.value());
            resp.setStatus("False");
            resp.setError("User Not Exits");
            resp.setMessage("User data not found!");
            resp.getData();
            return resp;
        }

        try {
            validateUser(user.get(), authModel);
        } catch (RuntimeException e) {
            String errorMessage = (e.getMessage() != null ? e.getMessage() : "Password Error");

            BaseResponseModel<JWTModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.getData();
            resp.setError(errorMessage);
            resp.setMessage("Email ID | Password is invalid");
            return resp;
        }

        JWTModel jwtModel = getJwt(authModel, user.get());

        List<Object> dataList = new ArrayList<>();
        dataList.add(new AuthModel(authModel.getEmail(), authModel.getPassword()));

        BaseResponseModel<JWTModel> resp = new BaseResponseModel<>();
        resp.setStatusCode(HttpStatus.OK.value());
        resp.setStatus("200");
        resp.setAuthentication_services(jwtModel);
        resp.setMessage("User Login Successfully");
        resp.setData(dataList);
        return resp;
    }


    private JWTModel getJwt(AuthModel authModel, UserModel userModel) {
        System.out.println(jwtSecretKey);
        String id = userModel.getId();
        String accessToken = Jwts.builder()
                .claim("id", id)
                .claim("email", authModel.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(SignatureAlgorithm.HS512, jwtSecretKey)
                .compact();

        // Generate refresh token
        String refreshToken = Jwts.builder()
                .claim("id", id)
                .claim("email", authModel.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Expiration time of 24 hours
                .signWith(SignatureAlgorithm.HS512, jwtSecretKey)
                .compact();

        return new JWTModel(accessToken, refreshToken);
    }


    /***
     *
     * @param userModel
     * TODO: Change the logic to use BCrypt
     * @param authModel
     */
    private void validateUser(UserModel userModel, AuthModel authModel) {

        if (!userModel.getPassword().equals(authModel.getPassword())) {
            throw new RuntimeException();
        } else {
            getJwt(authModel, userModel);
        }

    }




    public BaseResponseModel<List<JWTModel>> decode(String decode_tokens) {
        BaseResponseModel<List<JWTModel>> resp = new BaseResponseModel<>();

        String secret = jwtSecretKey; // JWT secret key
        System.out.println(secret);

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(decode_tokens)
                    .getBody();

            String id = (String) claims.get("id");


            String email = (String) claims.get("email");
            System.out.println(id);
            System.out.println(email);
            List<JWTDecode> users = new ArrayList<>();
            users.add(new JWTDecode(id, email));


            List<Object> objectList = new ArrayList<>();
            for (JWTDecode user : users) {
                objectList.add((Object) user);
            }

            resp.setMessage("Decode Successful");
            resp.setStatus("200");
            resp.setError("");
            resp.setData(objectList);


        } catch (JwtException e) {


            resp.setMessage("Decode Unsuccessful");
            resp.setStatus("400");

            // log or handle the exception as necessary

        }
        return resp;

    }



}



