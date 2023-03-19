package com.mongdb.dao;

import com.mongdb.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

@Component
public class UserDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 创建对象
     */
    public void saveTest(UserModel user) {
        mongoTemplate.save(user);
    }

    /**
     * 根据用户名和密码查询对象
     * @return
     */
    public UserModel findTestByNameAndPassWord(String name, String pwd) {
        Query query=new Query(Criteria.where("name").is(name)).addCriteria(Criteria.where("encryptedPassword").is(pwd));
        UserModel mgt =  mongoTemplate.findOne(query , UserModel.class);
        return mgt;
    }
    public UserModel findTestByEmailAndPassWord(String email, String pwd) {
        Query query=new Query(Criteria.where("email").is(email)).addCriteria(Criteria.where("encryptedPassword").is(pwd));
        UserModel mgt =  mongoTemplate.findOne(query , UserModel.class);
        return mgt;
    }

    /**
     * 根据用户名查询对象
     * @return
     */
    public UserModel findTestByName(String name) {
        Query query=new Query(Criteria.where("name").is(name));
        UserModel mgt =  mongoTemplate.findOne(query , UserModel.class);
        return mgt;
    }

    /**
     * 根据邮箱查询对象
     * @return
     */
    public UserModel findTestByEmail(String email) {
        Query query=new Query(Criteria.where("email").is(email));
        UserModel mgt =  mongoTemplate.findOne(query , UserModel.class);
        return mgt;
    }

    /**
     * 更新对象
     */
    public void updateTest(UserModel test) {
        Query query=new Query(Criteria.where("email").is(test.getEmail()));
        Update update= new Update().set("encryptedPassword", test.getEncryptedPassword()).set("name", test.getName());
        //更新查询返回结果集的第一条
        mongoTemplate.updateFirst(query,update, UserModel.class);
        //更新查询返回结果集的所有
        // mongoTemplate.updateMulti(query,update,TestEntity.class);
    }

    /**
     * 删除对象
     * @param id
     */
    public void deleteTestById(Integer id) {
        Query query=new Query(Criteria.where("id").is(id));
        mongoTemplate.remove(query, UserModel.class);
    }
}
