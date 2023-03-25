package com.mongdb.dao;

import com.mongdb.common.RabbitMQConfig;
import com.mongdb.model.EmailMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendSimpleEmail(String to, String subject, String text) {
        EmailMessage emailMessage = new EmailMessage(to, subject, text);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EMAIL_QUEUE, emailMessage);
    }
}

