package com.Quiz.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Quiz.entity.User;
import com.Quiz.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    
    @Autowired
    private UserRepository userRepo;
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        User user = userRepo.findByUsernameAndPassword(username, password);
        
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody User newUser) {
        if (userRepo.existsByUsername(newUser.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        
        // You may add more validation checks for email, password strength, etc.
        userRepo.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }
    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        Optional<User> userOptional = userRepo.findById(userId);

        return userOptional
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
