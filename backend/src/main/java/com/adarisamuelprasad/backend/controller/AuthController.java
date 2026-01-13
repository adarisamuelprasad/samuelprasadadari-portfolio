package com.adarisamuelprasad.backend.controller;

import com.adarisamuelprasad.backend.model.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @org.springframework.beans.factory.annotation.Value("${app.admin.email}")
    private String adminEmail;

    @org.springframework.beans.factory.annotation.Value("${app.admin.password}")
    private String adminPassword;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (adminEmail.equals(request.getEmail()) && adminPassword.equals(request.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("token", "dummy-jwt-token-for-demo"); // In a real app, generate a real JWT here
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
