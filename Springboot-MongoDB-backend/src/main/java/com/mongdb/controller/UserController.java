package com.mongdb.controller;

import com.mongdb.common.Result;
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

    //改成PostMapping 入参增加 @RequestBody UserModel userModel
    @PostMapping(value="/register")
    public Result register(@RequestBody UserModel userModel) throws Exception {
        System.out.println("Register method called with userModel: " + userModel);
//        UserModel user=new UserModel();
        //注释    测试数据
//        user.setEmail("503888768@qq.com");
//        user.setEncryptedPassword("123456");
//        user.setName("zy");
//        user.setCell("15367556962");
//        userDao.saveTest(user);
        //放开    校验用户名和邮箱    保存前端传入对象
        UserModel user = userDao.findTestByEmail(userModel.getEmail());
        if(user!=null){
            return Result.error("0","该邮箱已经被使用");
        }
        userDao.saveTest(userModel);
        return Result.success('1');
    }

    //改成PostMapping 入参增加 @RequestBody UserModel userModel
    @PostMapping(value="/login")
    public Result login(@RequestBody UserModel userModel){


        //放开 根据用户名和密码查询对象
        UserModel user = userDao.findTestByEmailAndPassWord(userModel.getEmail(),userModel.getEncryptedPassword());
        System.out.println("user is "+user);
        if(user == null){
            return Result.error("-1","用户名或密码错误");
        }
        return Result.success(user);
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
