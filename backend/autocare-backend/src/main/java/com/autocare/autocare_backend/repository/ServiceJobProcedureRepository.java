package com.autocare.autocare_backend.repository;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Repository;

@Repository
public class ServiceJobProcedureRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void createServiceJob(
            Long vehicleId,
            Long mechanicId,
            Long serviceTypeId,
            String description,
            String priority) {

        entityManager.createNativeQuery(
                "CALL create_service_job(" +
                ":vehicleId, :mechanicId, :serviceTypeId, " +
                ":description, :priority)"
        )
        .setParameter("vehicleId", vehicleId)
        .setParameter("mechanicId", mechanicId)
        .setParameter("serviceTypeId", serviceTypeId)
        .setParameter("description", description)
        .setParameter("priority", priority)
        .executeUpdate();
    }

    public List<Object[]> getVehicleServiceHistory(Long vehicleId) {

        return entityManager.createNativeQuery(
                "CALL get_vehicle_service_history(:vehicleId)"
        )
        .setParameter("vehicleId", vehicleId)
        .getResultList();
    }

    @Transactional
    public int updateJobStatus(Long jobId, String status) {

        return entityManager.createNativeQuery(
                "UPDATE service_jobs " +
                "SET status = :status " +
                "WHERE job_id = :jobId"
        )
        .setParameter("status", status)
        .setParameter("jobId", jobId)
        .executeUpdate();
    }
}