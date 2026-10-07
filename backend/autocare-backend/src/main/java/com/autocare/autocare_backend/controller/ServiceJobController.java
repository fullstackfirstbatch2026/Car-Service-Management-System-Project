package com.autocare.autocare_backend.controller;

import com.autocare.autocare_backend.entity.ServiceJob;
import com.autocare.autocare_backend.service.ServiceJobService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-jobs")
public class ServiceJobController {


private final ServiceJobService service;

public ServiceJobController(ServiceJobService service) {
    this.service = service;
}

// Get all service jobs
@GetMapping
public List<ServiceJob> getAll() {
    return service.getAll();
}

// Get service job by ID
@GetMapping("/{id}")
public ServiceJob getById(@PathVariable Integer id) {
    return service.getById(id);
}

// Pagination
// Example: /api/service-jobs/page?page=0&size=10
@GetMapping("/page")
public List<ServiceJob> getPage(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {

    return service.getPaginated(page, size);
}

// Get jobs by status
// Example: /api/service-jobs/status/PENDING
@GetMapping("/status/{status}")
public List<ServiceJob> getByStatus(
        @PathVariable String status) {

    return service.getByStatus(status);
}

// Get jobs by priority
// Example: /api/service-jobs/priority/HIGH
@GetMapping("/priority/{priority}")
public List<ServiceJob> getByPriority(
        @PathVariable String priority) {

    return service.getByPriority(priority);
}

// Search by description
// Example: /api/service-jobs/search?keyword=engine
@GetMapping("/search")
public List<ServiceJob> search(
        @RequestParam String keyword) {

    return service.search(keyword);
}

// Search using path variable
// Example: /api/service-jobs/search/engine
@GetMapping("/search/{keyword}")
public List<ServiceJob> searchByPath(
        @PathVariable String keyword) {

    return service.search(keyword);
}

// Create service job
@PostMapping
public ServiceJob create(@RequestBody ServiceJob job) {
    return service.create(job);
}

// Update service job
@PutMapping("/{id}")
public ServiceJob update(
        @PathVariable Integer id,
        @RequestBody ServiceJob job) {

    return service.update(id, job);
}

// Delete service job
@DeleteMapping("/{id}")
public void delete(@PathVariable Integer id) {
    service.delete(id);
}


}
