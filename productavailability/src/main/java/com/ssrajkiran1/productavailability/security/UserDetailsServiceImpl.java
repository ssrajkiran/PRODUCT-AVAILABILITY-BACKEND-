package com.ssrajkiran1.productavailability.security;

import com.ssrajkiran1.productavailability.model.repo.UserRepoModel;
import com.ssrajkiran1.productavailability.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Log4j2
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserRepoModel> urm = userRepository.findByEmail(username);

        if (urm.isEmpty()) {
            throw new UsernameNotFoundException(String.format("user email not found : %s", username));
        }

        List<SimpleGrantedAuthority> authorityList = urm.get().getUserRoles().stream().map(r -> new SimpleGrantedAuthority(r.toString())).toList();
        return new User(urm.get().getEmail(), urm.get().getPassword(), authorityList);

    }
}
