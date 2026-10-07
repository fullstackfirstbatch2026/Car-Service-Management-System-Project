package com.autocare.autocare_backend.repository;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

@Repository
public class MechanicPerformanceRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Object[]> getMechanicPerformance() {

        String sql = """
            SELECT
                m.mechanic_id,
                m.name,
                COUNT(sj.job_id) AS total_jobs
            FROM mechanics m
            JOIN service_jobs sj
                ON m.mechanic_id = sj.mechanic_id
            GROUP BY m.mechanic_id, m.name
            HAVING COUNT(sj.job_id) > (
                SELECT AVG(job_count)
                FROM (
                    SELECT COUNT(*) AS job_count
                    FROM service_jobs
                    GROUP BY mechanic_id
                ) mechanic_jobs
            )
            ORDER BY total_jobs DESC
            """;

        return entityManager
                .createNativeQuery(sql)
                .getResultList();
    }
}