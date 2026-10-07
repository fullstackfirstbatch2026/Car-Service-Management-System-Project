package com.autocare.autocare_backend.repository;

import com.autocare.autocare_backend.entity.ServiceJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportRepository extends JpaRepository<ServiceJob, Integer> {

    // JOIN query
    @Query("""
        SELECT sj
        FROM ServiceJob sj
        JOIN FETCH sj.vehicle v
        JOIN FETCH sj.serviceType st
        LEFT JOIN FETCH sj.mechanic m
        """)
    List<ServiceJob> findServiceJobsWithDetails();

    // Subquery: vehicles that have service jobs
    @Query("""
        SELECT v
        FROM Vehicle v
        WHERE v.vehicleId IN
        (
            SELECT sj.vehicle.vehicleId
            FROM ServiceJob sj
        )
        """)
    List<com.autocare.autocare_backend.entity.Vehicle> findVehiclesWithServiceJobs();

    // Subquery: service jobs whose total cost is above average
    @Query("""
        SELECT sj
        FROM ServiceJob sj
        WHERE sj.totalCost >
        (
            SELECT AVG(sj2.totalCost)
            FROM ServiceJob sj2
        )
        """)
    List<ServiceJob> findJobsAboveAverageCost();

    // JOIN + filtering
    @Query("""
        SELECT sj
        FROM ServiceJob sj
        JOIN sj.vehicle v
        JOIN sj.serviceType st
        WHERE st.serviceName = :serviceName
        """)
    List<ServiceJob> findJobsByServiceType(
            @Param("serviceName") String serviceName
    );
}