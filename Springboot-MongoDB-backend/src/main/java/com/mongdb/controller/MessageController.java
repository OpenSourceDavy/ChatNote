package com.mongdb.controller;

import com.mongdb.common.Result;
import com.mongdb.dao.MessageDao;
import com.mongdb.dao.UserDao;
import com.mongdb.model.MessageModel;
import com.mongdb.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
    @Autowired
    private MessageDao messageDao;

    @PostMapping(value="/feedbacks")
    public Result register(@RequestBody MessageModel messageModel) throws Exception {
        System.out.println("Feedbacks method called with userModel: " + messageModel.getUserMail());

        messageDao.saveTest(messageModel);
        return Result.success('1');
    }
}
