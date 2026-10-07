
package com.autocare.autocare_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.autocare.autocare_backend.service.ServiceJobProcedureService;

@RestController
@RequestMapping("/api/service-jobs")
@CrossOrigin(origins = "*")
public class ServiceJobProcedureController {

    private final ServiceJobProcedureService procedureService;

    public ServiceJobProcedureController(
            ServiceJobProcedureService procedureService) {

        this.procedureService = procedureService;
    }

    // =========================================================
    // CREATE SERVICE JOB
    // POST /api/service-jobs/procedure
    // =========================================================
    @PostMapping("/procedure")
    public ResponseEntity<?> createServiceJob(
            @RequestBody Map<String, Object> request) {

        Long vehicleId =
                Long.valueOf(
                        request.get("vehicleId").toString()
                );

        Long mechanicId =
                request.get("mechanicId") == null
                        ? null
                        : Long.valueOf(
                                request.get("mechanicId").toString()
                        );

        Long serviceTypeId =
                Long.valueOf(
                        request.get("serviceTypeId").toString()
                );

        String description =
                request.get("description").toString();

        String priority =
                request.get("priority").toString();

        procedureService.createServiceJob(
                vehicleId,
                mechanicId,
                serviceTypeId,
                description,
                priority
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Service job created successfully",

                        "vehicleId",
                        vehicleId,

                        "serviceTypeId",
                        serviceTypeId,

                        "priority",
                        priority
                )
        );
    }

    // =========================================================
    // GET VEHICLE SERVICE HISTORY
    // GET /api/service-jobs/history/{vehicleId}
    // =========================================================
    @GetMapping("/history/{vehicleId}")
    public ResponseEntity<?> getVehicleServiceHistory(
            @PathVariable Long vehicleId) {

        List<Object[]> history =
                procedureService.getVehicleServiceHistory(
                        vehicleId
                );

        return ResponseEntity.ok(history);
    }

    // =========================================================
    // UPDATE SERVICE JOB STATUS
    // PUT /api/service-jobs/{jobId}/status
    // =========================================================
    @PutMapping("/{jobId}/status")
    public ResponseEntity<?> updateServiceJobStatus(
            @PathVariable Long jobId,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        if (status == null || status.isBlank()) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "error",
                            "Status is required"
                    )
            );
        }

        boolean updated =
                procedureService.updateServiceJobStatus(
                        jobId,
                        status
                );

        if (!updated) {

            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Service job status updated successfully",

                        "jobId",
                        jobId,

                        "status",
                        status
                )
        );
    }
}

