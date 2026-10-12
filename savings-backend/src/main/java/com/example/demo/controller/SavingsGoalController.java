package com.example.demo.controller;

import com.example.demo.entity.SavingsGoal;
import com.example.demo.entity.SavingsGoalProgress;
import com.example.demo.services.SavingsGoalService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/savings-goals")
public class SavingsGoalController {

    private final SavingsGoalService savingsGoalService;

    public SavingsGoalController(
            SavingsGoalService savingsGoalService) {

        this.savingsGoalService = savingsGoalService;
    }

    @PostMapping
    public SavingsGoal createGoal(
            @Valid @RequestBody SavingsGoal goal) {

        return savingsGoalService.createGoal(goal);
    }

    @GetMapping
    public List<SavingsGoal> getAllGoals() {

        return savingsGoalService.getAllGoals();
    }

    @GetMapping("/{id}")
    public SavingsGoal getGoalById(
            @PathVariable Long id) {

        return savingsGoalService.getGoalById(id);
    }

    @PutMapping("/{id}")
    public SavingsGoal updateGoal(
            @PathVariable Long id,
            @Valid @RequestBody SavingsGoal goalDetails) {

        return savingsGoalService.updateGoal(id, goalDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteGoal(
            @PathVariable Long id) {

        savingsGoalService.deleteGoal(id);
    }

    @PostMapping("/{id}/deposit")
    public SavingsGoal deposit(
            @PathVariable Long id,
            @Positive @RequestParam BigDecimal amount) {

        return savingsGoalService.deposit(id, amount);
    }

    @GetMapping("/{id}/progress")
    public SavingsGoalProgress getProgress(
            @PathVariable Long id) {

        return savingsGoalService.getProgress(id);
    }

}