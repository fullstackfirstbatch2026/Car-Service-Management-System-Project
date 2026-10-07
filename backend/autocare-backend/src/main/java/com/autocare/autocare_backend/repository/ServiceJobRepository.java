package com.autocare.autocare_backend.repository;

import com.autocare.autocare_backend.entity.ServiceJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceJobRepository extends JpaRepository<ServiceJob, Integer> {


List<ServiceJob> findByStatusIgnoreCase(String status);

List<ServiceJob> findByPriorityIgnoreCase(String priority);

List<ServiceJob> findByDescriptionContainingIgnoreCase(String keyword);


}
