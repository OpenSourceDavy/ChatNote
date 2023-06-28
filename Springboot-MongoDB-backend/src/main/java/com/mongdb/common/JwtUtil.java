package com.mongdb.common;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import com.mongdb.model.UserModel;

import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "JWT_SECRET";
    private static final int EXPIRATION_TIME = 864000000; // 10 days

    public static String createToken(UserModel user) {
        return JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SECRET));
    }

    public static String validateToken(String token) {
        return JWT.require(Algorithm.HMAC512(SECRET))
                .build()
                .verify(token)
                .getSubject();
    }
}
