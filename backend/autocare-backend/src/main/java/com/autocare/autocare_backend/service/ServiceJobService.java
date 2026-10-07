package com.autocare.autocare_backend.service;

import com.autocare.autocare_backend.entity.ServiceJob;
import com.autocare.autocare_backend.repository.ServiceJobRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceJobService {


private final ServiceJobRepository repository;

public ServiceJobService(ServiceJobRepository repository) {
    this.repository = repository;
}

// Get all service jobs
public List<ServiceJob> getAll() {
    return repository.findAll();
}

// Get service job by ID
public ServiceJob getById(Integer id) {

    return repository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Service job not found: " + id));
}

// Create service job
public ServiceJob create(ServiceJob serviceJob) {
    return repository.save(serviceJob);
}

// Update service job
public ServiceJob update(Integer id, ServiceJob serviceJob) {

    ServiceJob existing = getById(id);

    existing.setVehicle(serviceJob.getVehicle());
    existing.setMechanic(serviceJob.getMechanic());
    existing.setServiceType(serviceJob.getServiceType());
    existing.setStartDate(serviceJob.getStartDate());
    existing.setCompletionDate(serviceJob.getCompletionDate());
    existing.setDescription(serviceJob.getDescription());
    existing.setPriority(serviceJob.getPriority());
    existing.setStatus(serviceJob.getStatus());
    existing.setLaborCost(serviceJob.getLaborCost());
    existing.setPartsCost(serviceJob.getPartsCost());
    existing.setTotalCost(serviceJob.getTotalCost());

    return repository.save(existing);
}

// Delete service job
public void delete(Integer id) {
    repository.delete(getById(id));
}

// Get jobs by status
public List<ServiceJob> getByStatus(String status) {
    return repository.findByStatusIgnoreCase(status);
}

// Get jobs by priority
public List<ServiceJob> getByPriority(String priority) {
    return repository.findByPriorityIgnoreCase(priority);
}

// Search jobs by description
public List<ServiceJob> search(String keyword) {
    return repository.findByDescriptionContainingIgnoreCase(keyword);
}

// Pagination
public List<ServiceJob> getPaginated(int page, int size) {

    // Prevent invalid page number
    if (page < 0) {
        page = 0;
    }

    // Prevent invalid page size
    if (size <= 0) {
        size = 10;
    }

    Pageable pageable = PageRequest.of(page, size);

    return repository.findAll(pageable).getContent();
}


}
