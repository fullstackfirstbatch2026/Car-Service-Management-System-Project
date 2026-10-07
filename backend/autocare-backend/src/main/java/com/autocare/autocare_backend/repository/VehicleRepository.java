package com.autocare.autocare_backend.repository;

import com.autocare.autocare_backend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByCustomerId(Long customerId);

    void deleteByCustomerId(Long customerId);
}