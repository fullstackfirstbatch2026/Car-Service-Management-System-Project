
package com.autocare.autocare_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.autocare.autocare_backend.repository.ServiceJobProcedureRepository;

@Service
public class ServiceJobProcedureService {

    private final ServiceJobProcedureRepository procedureRepository;

    public ServiceJobProcedureService(
            ServiceJobProcedureRepository procedureRepository) {

        this.procedureRepository = procedureRepository;
    }

    // =========================================================
    // CREATE SERVICE JOB
    // =========================================================

    public void createServiceJob(
            Long vehicleId,
            Long mechanicId,
            Long serviceTypeId,
            String description,
            String priority) {

        procedureRepository.createServiceJob(
                vehicleId,
                mechanicId,
                serviceTypeId,
                description,
                priority
        );
    }

    // =========================================================
    // GET VEHICLE SERVICE HISTORY
    // =========================================================

    public List<Object[]> getVehicleServiceHistory(Long vehicleId) {

        return procedureRepository.getVehicleServiceHistory(vehicleId);
    }

    // =========================================================
    // UPDATE SERVICE JOB STATUS
    // =========================================================

    public boolean updateServiceJobStatus(
            Long jobId,
            String status) {

        int rowsUpdated =
                procedureRepository.updateJobStatus(
                        jobId,
                        status
                );

        return rowsUpdated > 0;
    }
}

