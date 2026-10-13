package com.example.demo.services;

import com.example.demo.entity.SavingsGoal;
import com.example.demo.entity.User;
import com.example.demo.repository.SavingsGoalRepository;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SavingsGoalServiceTest {

    @Mock
    private SavingsGoalRepository savingsGoalRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SavingsGoalService savingsGoalService;

    @BeforeEach
    void setup() {

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "test@test.com",
                        null
                )
        );
    }

    @Test
    void shouldDepositMoneyIntoGoal() {

        User user = new User();
        user.setId(1L);

        SavingsGoal goal = new SavingsGoal();
        goal.setId(1L);
        goal.setUser(user);
        goal.setCurrentAmount(BigDecimal.valueOf(100));

        when(userRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(user));

        when(savingsGoalRepository.findById(1L))
                .thenReturn(Optional.of(goal));

        when(savingsGoalRepository.save(any()))
                .thenAnswer(invocation -> invocation.getArgument(0));

        SavingsGoal updated =
                savingsGoalService.deposit(
                        1L,
                        BigDecimal.valueOf(50)
                );

        assertEquals(
                BigDecimal.valueOf(150),
                updated.getCurrentAmount()
        );
    }
}