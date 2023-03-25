package com.mongdb.model;

import lombok.Data;

@Data
public class UserModel {
    private String name;
    private String cell;
    private String email;
    private String encryptedPassword;
    private boolean isSubscribed;
}
