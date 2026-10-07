package com.autocare.autocare_backend.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.autocare.autocare_backend.repository.ServiceCostRepository;

@Service
public class ServiceCostService {

    private final ServiceCostRepository serviceCostRepository;

    public ServiceCostService(
            ServiceCostRepository serviceCostRepository) {

        this.serviceCostRepository = serviceCostRepository;
    }

    public BigDecimal calculateServiceCost(Long jobId) {

        return serviceCostRepository.calculateServiceCost(jobId);
    }
}