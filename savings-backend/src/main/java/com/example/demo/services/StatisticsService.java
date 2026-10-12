package com.example.demo.services;

import com.example.demo.entity.Statistics;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.SavingsGoalRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class StatisticsService {

    private final ExpenseRepository expenseRepository;
    private final SavingsGoalRepository savingsGoalRepository;
    private final UserRepository userRepository;

    public StatisticsService(
            ExpenseRepository expenseRepository,
            SavingsGoalRepository savingsGoalRepository,
            UserRepository userRepository) {

        this.expenseRepository = expenseRepository;
        this.savingsGoalRepository = savingsGoalRepository;
        this.userRepository = userRepository;
    }

    public Statistics getStatistics() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Long userId = user.getId();

        return new Statistics(
                expenseRepository.sumAmountByUserId(userId),
                savingsGoalRepository.sumCurrentAmountByUserId(userId),
                expenseRepository.findByUserId(userId).size(),
                savingsGoalRepository.findByUserId(userId).size()
        );
    }
}