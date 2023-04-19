package com.ssrajkiran1.productavailability.security;

import com.ssrajkiran1.productavailability.model.request.jwt.JWTModel;
import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import io.jsonwebtoken.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Log4j2
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecretKey;
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    public JWTModel getJwt(UserRepoModel userRepoModel) {

        String id = userRepoModel.getId();

        String accessToken = Jwts.builder()
                .claim("id", id)
                .claim("name", userRepoModel.getEmail())
                .setSubject(userRepoModel.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(SignatureAlgorithm.HS512, jwtSecretKey)
                .compact();

        // Generate refresh token
        String refreshToken = Jwts.builder()
                .claim("id", id)
                .claim("name", userRepoModel.getEmail())
                .setSubject(userRepoModel.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Expiration time of 24 hours
                .signWith(SignatureAlgorithm.HS512, jwtSecretKey)
                .compact();



        return new JWTModel(accessToken,refreshToken);
    }




}
