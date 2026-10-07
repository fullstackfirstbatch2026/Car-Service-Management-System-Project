package com.autocare.autocare_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.autocare.autocare_backend.repository.ServiceJobReportRepository;

@Service
public class ServiceJobReportService {

    private final ServiceJobReportRepository repository;

    public ServiceJobReportService(
            ServiceJobReportRepository repository) {
        this.repository = repository;
    }

    public List<Object[]> getServiceJobReport() {
        return repository.getServiceJobReport();
    }
}