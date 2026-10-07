package com.autocare.autocare_backend.repository;

import com.autocare.autocare_backend.entity.Part;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartRepository extends JpaRepository<Part, Integer> {

    List<Part> findByPartNameContainingIgnoreCase(String name);
}