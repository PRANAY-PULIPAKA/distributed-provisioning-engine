package com.pranay.distributedprovisioningengine.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(
            String username
    ) throws UsernameNotFoundException {

        if (!username.equals("admin")) {

            throw new UsernameNotFoundException(
                    "User not found"
            );
        }

        return new User(

                "admin",

                "$2a$10$DowJonesIndexDowJonesIndexDowJ.",

                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_ADMIN"
                        )
                )
        );
    }
}

