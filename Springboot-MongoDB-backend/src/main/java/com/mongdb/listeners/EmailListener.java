package com.mongdb.listeners;

import com.mongdb.common.RabbitMQConfig;
import com.mongdb.model.EmailMessage;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class EmailListener {

    @Autowired
    private SendGrid sendGrid;
    //rabbit listener auto send ack if message is consumed
    @RabbitListener(queues = RabbitMQConfig.EMAIL_QUEUE)
    public void sendEmail(EmailMessage emailMessage) {
        Email from = new Email("davy3232323@gmail.com");
        Email recipient = new Email(emailMessage.getTo());
        Content content = new Content("text/plain", emailMessage.getText());
        Mail mail = new Mail(from, emailMessage.getSubject(), recipient, content);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
        } catch (IOException ex) {
            // Handle exception
        }
    }
}

