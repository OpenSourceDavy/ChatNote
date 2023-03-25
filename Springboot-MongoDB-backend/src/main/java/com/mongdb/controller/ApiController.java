package com.mongdb.controller;

import com.mongdb.model.ChatCompletionRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@RestController
public class ApiController {
    @Autowired
    private WebClient webClient;

    @PostMapping("/openai")
    public Mono<String> getOpenAIResponse(@RequestBody ChatCompletionRequest chatCompletionRequest) {
        String url = "https://api.openai.com/v1/chat/completions";
        String apiKey = ""; // Replace with your OpenAI API key

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "Bearer " + apiKey);

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = "";

        try {
            requestBody = objectMapper.writeValueAsString(chatCompletionRequest);
            System.out.println("Recieve from frontend: " + requestBody);
        } catch (Exception e) {
            System.err.println("Error converting request body to JSON: " + e.getMessage());
            return Mono.just("Error converting request body to JSON: " + e.getMessage());
        }



        return webClient.post()
                .uri(url)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .bodyValue(requestBody)

                .retrieve()

                .bodyToMono(String.class)

                .doOnSubscribe(subscription -> {
                    System.out.println("Request sent to OpenAI API");
                })
                .doOnNext(responseBody -> {
                    System.out.println("API Response: " + responseBody);
                })
                .doOnSuccess(responseEntity -> {
                    System.out.println("API Response successfully returned to frontend");
                })
                .onErrorResume(e -> {
                    System.err.println("Error: " + e.getMessage());
                    return Mono.just("Error: " + e.getMessage());
                });
    }
    @PostMapping("/openai4")
    public Mono<String> getOpenAI4Response(@RequestBody ChatCompletionRequest chatCompletionRequest) {
        String url = "https://api.openai.com/v1/chat/completions";
        String apiKey = ""; // Replace with your OpenAI API key

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "Bearer " + apiKey);

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = "";

        try {
            requestBody = objectMapper.writeValueAsString(chatCompletionRequest);
            System.out.println("Recieve from frontend: " + requestBody);
        } catch (Exception e) {
            System.err.println("Error converting request body to JSON: " + e.getMessage());
            return Mono.just("Error converting request body to JSON: " + e.getMessage());
        }



        return webClient.post()
                .uri(url)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .bodyValue(requestBody)

                .retrieve()

                .bodyToMono(String.class)

                .doOnSubscribe(subscription -> {
                    System.out.println("Request sent to OpenAI API");
                })
                .doOnNext(responseBody -> {
                    System.out.println("API Response: " + responseBody);
                })
                .doOnSuccess(responseEntity -> {
                    System.out.println("API Response successfully returned to frontend");
                })
                .onErrorResume(e -> {
                    System.err.println("Error: " + e.getMessage());
                    return Mono.just("Error: " + e.getMessage());
                });
    }
}