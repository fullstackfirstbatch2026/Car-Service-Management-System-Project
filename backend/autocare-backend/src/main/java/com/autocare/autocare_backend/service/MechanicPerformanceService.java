package com.autocare.autocare_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.autocare.autocare_backend.repository.MechanicPerformanceRepository;

@Service
public class MechanicPerformanceService {

    private final MechanicPerformanceRepository repository;

    public MechanicPerformanceService(
            MechanicPerformanceRepository repository) {
        this.repository = repository;
    }

    public List<Object[]> getMechanicPerformance() {
        return repository.getMechanicPerformance();
    }
}