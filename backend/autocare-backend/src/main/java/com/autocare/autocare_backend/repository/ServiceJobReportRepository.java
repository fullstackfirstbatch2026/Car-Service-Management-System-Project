package com.autocare.autocare_backend.repository;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

@Repository
public class ServiceJobReportRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Object[]> getServiceJobReport() {

        String sql = """
            SELECT
                sj.job_id,
                c.name AS customer_name,
                c.phone AS customer_phone,
                v.registration_number,
                v.brand,
                v.model,
                m.name AS mechanic_name,
                m.specialization,
                st.service_name,
                sj.status,
                sj.priority,
                sj.total_cost
            FROM service_jobs sj
            JOIN vehicles v
                ON sj.vehicle_id = v.vehicle_id
            JOIN customers c
                ON v.customer_id = c.customer_id
            JOIN mechanics m
                ON sj.mechanic_id = m.mechanic_id
            JOIN service_types st
                ON sj.service_type_id = st.service_type_id
            ORDER BY sj.job_id
            """;

        return entityManager
                .createNativeQuery(sql)
                .getResultList();
    }
}