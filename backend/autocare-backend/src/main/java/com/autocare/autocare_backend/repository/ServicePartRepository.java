package com.autocare.autocare_backend.repository;

import com.autocare.autocare_backend.entity.ServicePart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicePartRepository extends JpaRepository<ServicePart, Integer> {
}