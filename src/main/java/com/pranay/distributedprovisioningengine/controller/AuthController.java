package com.pranay.distributedprovisioningengine.controller;

import com.pranay.distributedprovisioningengine.dto.auth.LoginRequest;
import com.pranay.distributedprovisioningengine.dto.auth.LoginResponse;

import com.pranay.distributedprovisioningengine.security.JwtService;

import org.springframework.http.HttpStatus;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;

    public AuthController(
            JwtService jwtService,
            PasswordEncoder passwordEncoder
    ) {

        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        if (
                !request.getUsername().equals("admin")
                        ||
                        !request.getPassword().equals("admin123")
        ) {

            throw new RuntimeException(
                    "Invalid credentials"
            );
        }

        String token =
                jwtService.generateToken(
                        request.getUsername()
                );

        return new LoginResponse(token);
    }
}

