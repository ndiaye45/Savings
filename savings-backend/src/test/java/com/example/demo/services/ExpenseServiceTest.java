package com.example.demo.services;

import com.example.demo.entity.Expense;
import com.example.demo.entity.User;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ExpenseService expenseService;

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
    void shouldCreateExpense() {

        User user = new User();
        user.setId(1L);

        Expense expense = new Expense();

        when(userRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(user));

        when(expenseRepository.save(any()))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Expense saved =
                expenseService.createExpense(expense);

        assertNotNull(saved);
        assertEquals(user, saved.getUser());
    }
}