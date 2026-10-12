package com.example.demo.services;

import com.example.demo.entity.SavingsGoal;
import com.example.demo.entity.SavingsGoalProgress;
import com.example.demo.entity.User;
import com.example.demo.exception.AccessDeniedException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.SavingsGoalRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class SavingsGoalService {

    private final SavingsGoalRepository savingsGoalRepository;
    private final UserRepository userRepository;

    public SavingsGoalService(
            SavingsGoalRepository savingsGoalRepository,
            UserRepository userRepository) {

        this.savingsGoalRepository = savingsGoalRepository;
        this.userRepository = userRepository;
    }

    public SavingsGoal createGoal(SavingsGoal goal) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        goal.setUser(user);

        if (goal.getCurrentAmount() == null) {
            goal.setCurrentAmount(BigDecimal.ZERO);
        }

        return savingsGoalRepository.save(goal);
    }

    public List<SavingsGoal> getAllGoals() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return savingsGoalRepository.findByUserId(user.getId());
    }

    public SavingsGoal getGoalById(Long id) {

        User user = getCurrentUser();

        SavingsGoal goal = savingsGoalRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Savings goal not found"));

        checkOwnership(goal, user);

        return goal;
    }

    public SavingsGoal updateGoal(Long id, SavingsGoal goalDetails) {

        User user = getCurrentUser();

        SavingsGoal goal = savingsGoalRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Savings goal not found"));

        checkOwnership(goal, user);

        goal.setName(goalDetails.getName());
        goal.setTargetAmount(goalDetails.getTargetAmount());
        goal.setDeadline(goalDetails.getDeadline());

        return savingsGoalRepository.save(goal);
    }

    public void deleteGoal(Long id) {

        User user = getCurrentUser();

        SavingsGoal goal = savingsGoalRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Savings goal not found"));

        checkOwnership(goal, user);

        savingsGoalRepository.delete(goal);
    }

    public SavingsGoal deposit(Long id, BigDecimal amount) {

        User user = getCurrentUser();

        SavingsGoal goal = savingsGoalRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Savings goal not found"));

        checkOwnership(goal, user);

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException(
                    "Deposit amount must be greater than zero");
        }

        BigDecimal newAmount =
                goal.getCurrentAmount().add(amount);

        goal.setCurrentAmount(newAmount);

        return savingsGoalRepository.save(goal);
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    // Check if the savings goal belongs to the current user
    private void checkOwnership(SavingsGoal goal, User user) {

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Access denied");
        }
    }

    public SavingsGoalProgress getProgress(Long id) {

        User user = getCurrentUser();

        SavingsGoal goal = savingsGoalRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Savings goal not found"));

        checkOwnership(goal, user);

        BigDecimal remainingAmount =
                goal.getTargetAmount()
                        .subtract(goal.getCurrentAmount());

        if (remainingAmount.compareTo(BigDecimal.ZERO) < 0) {
            remainingAmount = BigDecimal.ZERO;
        }

        BigDecimal progressPercentage =
                goal.getCurrentAmount()
                        .multiply(BigDecimal.valueOf(100))
                        .divide(
                                goal.getTargetAmount(),
                                2,
                                java.math.RoundingMode.HALF_UP
                        );

        if (progressPercentage.compareTo(BigDecimal.valueOf(100)) > 0) {
            progressPercentage = BigDecimal.valueOf(100);
        }

        return new SavingsGoalProgress(
                goal.getId(),
                goal.getName(),
                goal.getTargetAmount(),
                goal.getCurrentAmount(),
                remainingAmount,
                progressPercentage
        );
    }
}