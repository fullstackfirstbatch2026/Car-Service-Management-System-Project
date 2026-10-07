package com.autocare.autocare_backend.service;

import com.autocare.autocare_backend.entity.ServiceType;
import com.autocare.autocare_backend.repository.ServiceTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceTypeService {

    private final ServiceTypeRepository repository;

    public ServiceTypeService(ServiceTypeRepository repository) {
        this.repository = repository;
    }

    public List<ServiceType> getAll() {
        return repository.findAll();
    }

    public ServiceType getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service type not found: " + id));
    }

    public ServiceType create(ServiceType serviceType) {
        return repository.save(serviceType);
    }

    public ServiceType update(Integer id, ServiceType serviceType) {

        ServiceType existing = getById(id);

        existing.setServiceName(serviceType.getServiceName());
        existing.setBaseCost(serviceType.getBaseCost());
        existing.setEstimatedHours(serviceType.getEstimatedHours());

        return repository.save(existing);
    }

    public void delete(Integer id) {
        repository.delete(getById(id));
    }
}