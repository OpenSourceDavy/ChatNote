package com.mongdb.common;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EMAIL_QUEUE = "email_queue";

    @Bean
    public Queue emailQueue() {
        return new Queue(EMAIL_QUEUE, false);
    }
}

