package com.autocare.autocare_backend.service;

import com.autocare.autocare_backend.entity.Part;
import com.autocare.autocare_backend.repository.PartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartService {

    private final PartRepository repository;

    public PartService(PartRepository repository) {
        this.repository = repository;
    }

    public List<Part> getAll() {
        return repository.findAll();
    }

    public Part getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Part not found: " + id));
    }

    public Part create(Part part) {
        return repository.save(part);
    }

    public Part update(Integer id, Part part) {

        Part existing = getById(id);

        existing.setPartName(part.getPartName());
        existing.setUnitPrice(part.getUnitPrice());
        existing.setStockQuantity(part.getStockQuantity());

        return repository.save(existing);
    }

    public void delete(Integer id) {
        repository.delete(getById(id));
    }
}