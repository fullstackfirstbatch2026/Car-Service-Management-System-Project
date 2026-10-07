package com.autocare.autocare_backend.service;

import com.autocare.autocare_backend.entity.ServiceJob;
import com.autocare.autocare_backend.entity.Vehicle;
import com.autocare.autocare_backend.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    // JOIN
    public List<ServiceJob> getServiceJobsWithDetails() {
        return reportRepository.findServiceJobsWithDetails();
    }

    // SUBQUERY
    public List<Vehicle> getVehiclesWithServiceJobs() {
        return reportRepository.findVehiclesWithServiceJobs();
    }

    // SUBQUERY
    public List<ServiceJob> getJobsAboveAverageCost() {
        return reportRepository.findJobsAboveAverageCost();
    }

    // JOIN + WHERE
    public List<ServiceJob> getJobsByServiceType(String serviceName) {
        return reportRepository.findJobsByServiceType(serviceName);
    }
}