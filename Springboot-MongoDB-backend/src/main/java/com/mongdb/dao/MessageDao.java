package com.mongdb.dao;

import com.mongdb.model.MessageModel;
import com.mongdb.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

@Component
public class MessageDao {


    @Autowired
    private MongoTemplate mongoTemplate;
    /**
     * 创建对象
     */
    public void saveTest(MessageModel messageModel) {
        mongoTemplate.save(messageModel);
    }
}
