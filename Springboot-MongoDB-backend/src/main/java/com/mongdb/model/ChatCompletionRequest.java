package com.mongdb.model;


import java.util.List;
import lombok.Data;

@Data
public class ChatCompletionRequest {

    private List<ApiModel> messages;
    private String model;

}
