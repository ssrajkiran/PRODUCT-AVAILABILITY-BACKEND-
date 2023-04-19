package com.ssrajkiran1.productavailability.service;


import com.ssrajkiran1.productavailability.model.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.UserModel;
import com.ssrajkiran1.productavailability.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public BaseResponseModel<UserModel> save(UserModel user) {

        Optional<UserModel> emailExists = userRepository.findByEmail(user.getEmail());

        if (emailExists.isEmpty()) {
            userRepository.save(user);

            List<Object> dataList = new ArrayList<>();
            UserModel userdata = userRepository.findByEmailAndPassword(user.getEmail(),user.getPassword());

            dataList.add(new UserModel(userdata.getId(),userdata.getPassword(),userdata.getEmail(),userdata.getUsername()));

            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("User Account Fetched Successfully");
            resp.setData(dataList);
            return resp;

        } else {
            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("User Aldready Exists");
            resp.setMessage("User data Aldready Found!");
            resp.getData();
            return resp;


        }

    }

    public boolean userExists(String email) {

        return userRepository.existsByEmail(email);
    }

    public BaseResponseModel<UserModel> getAllShops() {
        List<UserModel> data = userRepository.findAll();


        if (data.isEmpty()){
            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("Database Empty Error");
            resp.setMessage("Database is empty");
            resp.getData();
            return resp;
        }
        else{
            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            List<Object> dataList = new ArrayList<>();
                for(UserModel user : data){
                    dataList.add(new UserModel(user.getId(),user.getPassword(),user.getEmail(),user.getUsername()));
                }
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("Database Fetched Successfully");
            resp.setData(dataList);
            return  resp;
        }

    }


    public BaseResponseModel<UserModel> deleteShopById(String id) {

        Optional<UserModel> emailExists = userRepository.findById(id);
        if (emailExists.isEmpty()) {
            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("Account Not Found");
            resp.setMessage("Account not deleted!");
            resp.getData();
            return resp;

        } else {
            userRepository.deleteById(id);
            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("Successfully Account deleted!");
            resp.getData();
            return resp;
        }
    }

    public BaseResponseModel <UserModel> getById(String id) {

        Optional<UserModel> exits = userRepository.findById(id);

        if (exits.isEmpty()) {
            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.UNAUTHORIZED.hashCode());
            resp.setStatus("False");
            resp.setError("AccountFoundError");
            resp.setMessage("Account not Found!");
            resp.getData();
            return resp;

        } else {
            List<Object> dataList = new ArrayList<>();
            UserModel userdata = userRepository.getById(id);
            dataList.add(new UserModel(userdata.getId(),userdata.getPassword(),userdata.getEmail(),userdata.getUsername()));

            BaseResponseModel<UserModel> resp = new BaseResponseModel<>();
            resp.setStatusCode(HttpStatus.OK.hashCode());
            resp.setStatus("True");
            resp.setError("");
            resp.setMessage("Successfully Fetched!");
            resp.setData(dataList);
            return resp;
        }
    }
}
