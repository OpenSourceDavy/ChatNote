package com.mongdb.controller;

import com.mongdb.common.Result;
import com.mongdb.dao.EmailService;
import com.mongdb.dao.UserDao;
import com.mongdb.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserDao userDao;
    private EmailService emailService;

    @PostMapping(value="/register")
    public Result register(@RequestBody UserModel userModel) throws Exception {
        System.out.println("Register method called with userModel: " + userModel);

        UserModel user = userDao.findTestByEmail(userModel.getEmail());
        if(user!=null){
            return Result.error("0","this email already exist");
        }
        userDao.saveTest(userModel);
        return Result.success('1');
    }


    @PostMapping(value="/login")
    public Result login(@RequestBody UserModel userModel){



        UserModel user = userDao.findTestByEmailAndPassWord(userModel.getEmail(),userModel.getEncryptedPassword());
        System.out.println("user is "+user);
        if(user == null){
            return Result.error("-1","wrong mail or password");
        }
        return Result.success(user);
    }

    @PostMapping("/subscribe")
    public Result subscribeUser(@RequestBody UserModel userModel) {
        // Save the user to the database
        userModel.setSubscribed(true);
        userDao.saveTest(userModel);

        // Send a welcome email to the user
        String subject = "Welcome to ChatNote!";
        String text = "Hello " + userModel.getEmail() + ",\n\n" +
                "Thank you for subscribing to our website. We're excited to have you on board!\n\n" +
                "Best Regards,\n" +
                "The Team";
        emailService.sendSimpleEmail(userModel.getEmail(), subject, text);

        return Result.success('1');
    }

    @GetMapping(value="/test3")
    public void updateTest(){
        UserModel user=new UserModel();
        user.setName("hi");
        userDao.updateTest(user);
    }

    @GetMapping(value="/test4")
    public void deleteTestById(){
        userDao.deleteTestById(1);
    }
}
