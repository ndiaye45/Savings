package com.example.demo.services;

import com.example.demo.entity.Statistics;
import com.example.demo.entity.User;
import com.example.demo.repository.ExpenseRepository;
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
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StatisticsServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private SavingsGoalRepository savingsGoalRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private StatisticsService statisticsService;

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
    void shouldReturnStatistics() {

        User user = new User();
        user.setId(1L);

        when(userRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(user));

        when(expenseRepository.sumAmountByUserId(1L))
                .thenReturn(BigDecimal.valueOf(500));

        when(savingsGoalRepository.sumCurrentAmountByUserId(1L))
                .thenReturn(BigDecimal.valueOf(200));

        when(expenseRepository.findByUserId(1L))
                .thenReturn(List.of());

        when(savingsGoalRepository.findByUserId(1L))
                .thenReturn(List.of());

        Statistics statistics =
                statisticsService.getStatistics();

        assertNotNull(statistics);
    }
}