package com.autocare.autocare_backend.repository;

import java.math.BigDecimal;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

@Repository
public class ServiceCostRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public BigDecimal calculateServiceCost(Long jobId) {

        Object result = entityManager
                .createNativeQuery(
                        "SELECT calculate_service_cost(:jobId)"
                )
                .setParameter("jobId", jobId)
                .getSingleResult();

        return (BigDecimal) result;
    }
}