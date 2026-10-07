package com.autocare.autocare_backend.controller;

import com.autocare.autocare_backend.entity.Mechanic;
import com.autocare.autocare_backend.service.MechanicService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
@CrossOrigin(origins = "*")
public class MechanicController {

    private final MechanicService mechanicService;

    public MechanicController(MechanicService mechanicService) {
        this.mechanicService = mechanicService;
    }

    @GetMapping
    public ResponseEntity<List<Mechanic>> getAllMechanics() {
        return ResponseEntity.ok(mechanicService.getAllMechanics());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mechanic> getMechanicById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mechanicService.getMechanicById(id));
    }

    @PostMapping
    public ResponseEntity<Mechanic> createMechanic(
            @RequestBody Mechanic mechanic) {

        return ResponseEntity.ok(
                mechanicService.createMechanic(mechanic));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mechanic> updateMechanic(
            @PathVariable Long id,
            @RequestBody Mechanic mechanic) {

        return ResponseEntity.ok(
                mechanicService.updateMechanic(id, mechanic));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMechanic(
            @PathVariable Long id) {

        mechanicService.deleteMechanic(id);

        return ResponseEntity.ok(
                "Mechanic deleted successfully");
    }
}