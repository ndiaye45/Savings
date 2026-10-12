package com.example.demo.entity;

import java.math.BigDecimal;

public class Statistics {

    private BigDecimal totalExpenses;
    private BigDecimal totalSavings;
    private int numberOfExpenses;
    private int numberOfSavingsGoals;

    public Statistics(
            BigDecimal totalExpenses,
            BigDecimal totalSavings,
            int numberOfExpenses,
            int numberOfSavingsGoals) {

        this.totalExpenses = totalExpenses;
        this.totalSavings = totalSavings;
        this.numberOfExpenses = numberOfExpenses;
        this.numberOfSavingsGoals = numberOfSavingsGoals;
    }

    public BigDecimal getTotalExpenses() {
        return totalExpenses;
    }

    public BigDecimal getTotalSavings() {
        return totalSavings;
    }

    public int getNumberOfExpenses() {
        return numberOfExpenses;
    }

    public int getNumberOfSavingsGoals() {
        return numberOfSavingsGoals;
    }
}