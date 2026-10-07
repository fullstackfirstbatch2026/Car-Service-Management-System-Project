package com.autocare.autocare_backend.controller;

import com.autocare.autocare_backend.entity.ServiceType;
import com.autocare.autocare_backend.service.ServiceTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-types")
public class ServiceTypeController {

    private final ServiceTypeService service;

    public ServiceTypeController(ServiceTypeService service) {
        this.service = service;
    }

    @GetMapping
    public List<ServiceType> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ServiceType getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public ServiceType create(@RequestBody ServiceType serviceType) {
        return service.create(serviceType);
    }

    @PutMapping("/{id}")
    public ServiceType update(
            @PathVariable Integer id,
            @RequestBody ServiceType serviceType) {
        return service.update(id, serviceType);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}