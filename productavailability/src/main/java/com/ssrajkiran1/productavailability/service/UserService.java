package com.ssrajkiran1.productavailability.service;
import com.ssrajkiran1.productavailability.exception.UserAlreadyExistsException;
import com.ssrajkiran1.productavailability.exception.UserNotFoundException;
import com.ssrajkiran1.productavailability.model.response.BaseResponseModel;
import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import com.ssrajkiran1.productavailability.model.repo.UserRoles;
import com.ssrajkiran1.productavailability.model.request.UserRequestModel;
import com.ssrajkiran1.productavailability.model.response.UserResponseModel;
import com.ssrajkiran1.productavailability.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;



    public BaseResponseModel<UserResponseModel> save(UserRequestModel user) {

        if (userExists(user.getEmail())) {
            BaseResponseModel<UserResponseModel> resp = new BaseResponseModel<>();
            resp.setMessage("User Account Email already exists");
            resp.setStatus(true);
            resp.setError("Email Already Found");
            resp.setStatusCode(HttpStatus.OK.value());
            return resp;
        }

        UserRepoModel userRepoModel = new UserRepoModel(null,
                user.getUsername(),
                user.getEmail(),
                bCryptPasswordEncoder.encode(user.getPassword()),
                List.of(UserRoles.ADMIN));

        UserRepoModel savedResp = userRepository.save(userRepoModel);

        return new BaseResponseModel<>(new UserResponseModel(savedResp),"User Account Created Successfully");

    }

    public BaseResponseModel<List<UserResponseModel>> getAllUsers() {

        List<UserRepoModel> allUsers = userRepository.findAll();

        List<UserResponseModel> respModel = allUsers.stream().map(UserResponseModel::new).toList();
        return new BaseResponseModel<>(respModel,"User List Database");

    }

    public BaseResponseModel<UserRepoModel> deleteUserById(String userid) {
        UserRepoModel urm = userRepository.findUserById(userid);
        userRepository.delete(urm);
        return new BaseResponseModel<>(null,"User Account Deleted");
    }

//    public BaseResponseModel<UserResponseModel> getUserById(String id) {
//        UserRepoModel urm = userRepository.getUserByIdIn(id);
//
//        return new BaseResponseModel(new UserResponseModel(urm),"User Account Data");
//    }


//    public BaseResponseModel<UserRepoModel> findUserById(String id)  {
//        Optional<UserRepoModel> urm = userRepository.findById(id);
//        BaseResponseModel<UserRepoModel> resp = new BaseResponseModel<>();
//        if (urm.isEmpty()) {
//            resp.setStatusCode(HttpStatus.OK.value());
//            resp.setStatus(true);
//            return new BaseResponseModel<>(null,"User Not Found");
//        }
//
//        return new BaseResponseModel<>(urm.get(),"Fetched successfully");
//    }

    public UserRepoModel findUserByEmail(String email) {
        Optional<UserRepoModel> urm = userRepository.findByEmail(email);
        if (urm.isEmpty()) {
            throw new UserNotFoundException(String.format("User with id %s does not exists", email));
        }
        return urm.get();
    }


    public boolean userExists(String email) {

        return userRepository.existsByEmail(email);
    }


}
