package com.autocare.autocare_backend.repository;

import com.autocare.autocare_backend.entity.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceTypeRepository extends JpaRepository<ServiceType, Integer> {
}