package com.autocare.autocare_backend.controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.autocare.autocare_backend.service.ServiceCostService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ServiceCostController {

    private final ServiceCostService serviceCostService;

    public ServiceCostController(
            ServiceCostService serviceCostService) {

        this.serviceCostService = serviceCostService;
    }

    @GetMapping("/service-cost/{jobId}")
    public ResponseEntity<?> getServiceCost(
            @PathVariable Long jobId) {

        BigDecimal totalCost =
                serviceCostService.calculateServiceCost(jobId);

        return ResponseEntity.ok(
                Map.of(
                        "jobId", jobId,
                        "calculatedServiceCost", totalCost
                )
        );
    }
}