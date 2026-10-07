package com.autocare.autocare_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autocare.autocare_backend.service.ServiceJobReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ServiceJobReportController {

    private final ServiceJobReportService service;

    public ServiceJobReportController(
            ServiceJobReportService service) {
        this.service = service;
    }

    @GetMapping("/service-jobs")
    public ResponseEntity<List<Object[]>> getServiceJobReport() {

        return ResponseEntity.ok(
                service.getServiceJobReport()
        );
    }
}