package com.shop.ecommerce.controller;

import com.shop.ecommerce.model.User;
import com.shop.ecommerce.model.dto.AuthResponse;
import com.shop.ecommerce.model.dto.LoginRequest;
import com.shop.ecommerce.model.dto.RegisterRequest;
import com.shop.ecommerce.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        return ResponseEntity.ok(Map.of(
            "id", user.getId(),
            "name", user.getName(),
            "email", user.getEmail(),
            "phone", user.getPhone() != null ? user.getPhone() : "",
            "address", user.getAddress() != null ? user.getAddress() : "",
            "city", user.getCity() != null ? user.getCity() : "",
            "state", user.getState() != null ? user.getState() : "",
            "zipCode", user.getZipCode() != null ? user.getZipCode() : ""
        ));
    }
}
