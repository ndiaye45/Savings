package com.example.demo.controller;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.ResetPassword;
import com.example.demo.entity.User;
import com.example.demo.services.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Route publique (inscription)
    @PostMapping("/users")
    public User createUser(@Valid @RequestBody User user) {
        return userService.createUser(user);
    }

    // Soi-même ou admin
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id, Authentication auth) {
        userService.checkSelfOrAdmin(id, auth);
        return userService.getUserById(id);
    }

    // Admin uniquement (règle dans SecurityConfig)
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // Admin uniquement (règle dans SecurityConfig)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Soi-même ou admin
    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id,
                           @Valid @RequestBody User userDetails,
                           Authentication auth) {
        userService.checkSelfOrAdmin(id, auth);
        return userService.updateUser(id, userDetails);
    }

    // Soi-même ou admin
    @PutMapping("/users/{id}/password")
    public User updatePassword(@PathVariable Long id,
                               @RequestBody ChangePasswordRequest passwordRequest,
                               Authentication auth) {
        userService.checkSelfOrAdmin(id, auth);
        return userService.updatePassword(id, passwordRequest);
    }

    // Route publique (connexion)
    @PostMapping("/auth/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest);
    }

    // Admin uniquement (règle dans SecurityConfig)
    @PutMapping("/users/{id}/reset-password")
    public void resetPassword(@PathVariable Long id,
                              @RequestBody ResetPassword newPassword) {
        userService.resetPassword(id, newPassword);
    }
}