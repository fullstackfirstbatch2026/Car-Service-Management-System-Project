package com.autocare.autocare_backend.repository;

import com.autocare.autocare_backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    List<Payment> findByServiceJobJobId(Integer jobId);
}