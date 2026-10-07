package com.autocare.autocare_backend.controller;

import com.autocare.autocare_backend.entity.Part;
import com.autocare.autocare_backend.service.PartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class PartController {

    private final PartService service;

    public PartController(PartService service) {
        this.service = service;
    }

    @GetMapping
    public List<Part> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Part getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public Part create(@RequestBody Part part) {
        return service.create(part);
    }

    @PutMapping("/{id}")
    public Part update(
            @PathVariable Integer id,
            @RequestBody Part part) {
        return service.update(id, part);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}