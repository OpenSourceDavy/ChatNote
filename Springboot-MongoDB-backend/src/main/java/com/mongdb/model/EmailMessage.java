package com.mongdb.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class EmailMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    private String to;
    private String subject;
    private String text;

    public EmailMessage(String to, String subject, String text) {
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

    // Constructor, getters, and setters
}
