package com.example.demo.services;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.ResetPassword;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.EmailAlreadyUsedException;
import com.example.demo.exception.InvalidCredentialsException;
import com.example.demo.exception.InvalidPasswordException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.exception.AccessDeniedException;
import org.springframework.security.core.Authentication;
import java.util.List;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User createUser(User user) {
        if (user.getPassword() == null) {
            throw new InvalidPasswordException("Le mot de passe est obligatoire");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException("Email déjà utilisé");
        }
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec id: " + id));
    }

    public void checkSelfOrAdmin(Long id, Authentication auth) {
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        User target = getUserById(id);
        if (!isAdmin && !target.getEmail().equals(auth.getName())) {
            throw new AccessDeniedException("Accès refusé");
        }
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        userRepository.findByEmail(userDetails.getEmail())
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new EmailAlreadyUsedException("Email déjà utilisé");
                });
        user.setFirstname(userDetails.getFirstname());
        user.setLastname(userDetails.getLastname());
        user.setEmail(userDetails.getEmail());
        return userRepository.save(user);
    }

    public User updatePassword(Long id, ChangePasswordRequest passwordRequest){
        User user = getUserById(id);
        String storedPassword = user.getPassword();
        String currentPassword = passwordRequest.getCurrentPassword();
        if (!passwordEncoder.matches(currentPassword, storedPassword)){
            throw new InvalidPasswordException("Le mot de passe actuel est incorrect");
        }
        user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
        return userRepository.save(user);
    }

    public String login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Email ou mot de passe incorrect");
        }
        return jwtService.generateToken(user.getId(), user.getEmail(), user.getRole());
    }

    public void resetPassword(Long id, ResetPassword newPassword) {
        User user = getUserById(id);
        String newHash = passwordEncoder.encode(newPassword.getNewPassword());
        user.setPassword(newHash);
        userRepository.save(user);
    }
}
