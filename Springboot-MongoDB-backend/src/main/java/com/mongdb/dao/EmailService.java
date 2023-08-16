package com.mongdb.dao;

import com.mongdb.common.RabbitMQConfig;
import com.mongdb.model.EmailMessage;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate.ConfirmCallback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private RabbitTemplate rabbitTemplate;


    public EmailService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        // 设置确认回调
        this.rabbitTemplate.setConfirmCallback(confirmCallback());
    }
    public boolean sendSimpleEmail(String to, String subject, String text) {
        boolean[] isSent = {false}; // 用于保存发送状态的变量
        try {
            EmailMessage emailMessage = new EmailMessage(to, subject, text);
            CorrelationData correlationData = new CorrelationData();
            rabbitTemplate.convertAndSend(RabbitMQConfig.EMAIL_QUEUE, emailMessage, correlationData);
            synchronized (isSent) {
                isSent.wait(5000); // 等待回调设置isSent的值
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return isSent[0]; // 返回发送状态
    }

    private ConfirmCallback confirmCallback() {
        return (correlationData, ack, cause) -> {
            boolean[] isSent = {false};
            if (ack) {
                isSent[0] = true;
            } else {
                System.out.println("Message failed: " + cause);
                isSent[0] = false;
            }
            synchronized (isSent) {
                isSent.notify(); // 唤醒等待线程
            }
        };
    }
}

