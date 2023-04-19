package com.ssrajkiran1.productavailability.repository;


import com.ssrajkiran1.productavailability.model.UserModel;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends MongoRepository<UserModel, String> {


    Optional<UserModel> findByEmail(String email);

    UserModel findByEmailAndPassword(String email, String password);

    boolean existsByEmail(String email);


    UserModel getById(String id);
}
