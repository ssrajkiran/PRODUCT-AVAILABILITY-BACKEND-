package com.ssrajkiran1.productavailability.repository;


import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface UserRepository extends MongoRepository<UserRepoModel, String> {


    Optional<UserRepoModel> findByEmail(String email);



    boolean existsByEmail(String email);


    UserRepoModel getUserByIdIn(String id);

    UserRepoModel findUserById(String id);
}
