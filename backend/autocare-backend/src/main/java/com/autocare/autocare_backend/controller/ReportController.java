package com.autocare.autocare_backend.controller;

import com.autocare.autocare_backend.entity.ServiceJob;
import com.autocare.autocare_backend.entity.Vehicle;
import com.autocare.autocare_backend.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // JOIN query
    @GetMapping("/service-jobs-details")
    public List<ServiceJob> getServiceJobsWithDetails() {
        return reportService.getServiceJobsWithDetails();
    }

    // SUBQUERY
    @GetMapping("/vehicles-with-service-jobs")
    public List<Vehicle> getVehiclesWithServiceJobs() {
        return reportService.getVehiclesWithServiceJobs();
    }

    // SUBQUERY
    @GetMapping("/above-average-cost")
    public List<ServiceJob> getJobsAboveAverageCost() {
        return reportService.getJobsAboveAverageCost();
    }

    // JOIN + WHERE
    @GetMapping("/by-service-type")
    public List<ServiceJob> getJobsByServiceType(
            @RequestParam String serviceName
    ) {
        return reportService.getJobsByServiceType(serviceName);
    }
}