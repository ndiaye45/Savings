package com.example.demo.repository;

import com.example.demo.entity.SavingsGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface SavingsGoalRepository extends JpaRepository<SavingsGoal, Long> {

    List<SavingsGoal> findByUserId(Long userId);

    @Query("SELECT COALESCE(SUM(s.currentAmount), 0) FROM SavingsGoal s WHERE s.user.id = :userId")
    BigDecimal sumCurrentAmountByUserId(@Param("userId") Long userId);
}