package com.autocare.autocare_backend.service;

import com.autocare.autocare_backend.entity.Mechanic;
import com.autocare.autocare_backend.repository.MechanicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MechanicService {

    private final MechanicRepository mechanicRepository;

    public MechanicService(MechanicRepository mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    public List<Mechanic> getAllMechanics() {
        return mechanicRepository.findAll();
    }

    public Mechanic getMechanicById(Long id) {
        return mechanicRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Mechanic not found with ID: " + id));
    }

    public Mechanic createMechanic(Mechanic mechanic) {
        return mechanicRepository.save(mechanic);
    }

    public Mechanic updateMechanic(Long id, Mechanic updatedMechanic) {

        Mechanic existingMechanic = mechanicRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Mechanic not found with ID: " + id));

        existingMechanic.setName(updatedMechanic.getName());
        existingMechanic.setPhone(updatedMechanic.getPhone());
        existingMechanic.setSpecialization(updatedMechanic.getSpecialization());
        existingMechanic.setExperienceYears(updatedMechanic.getExperienceYears());
        existingMechanic.setStatus(updatedMechanic.getStatus());

        return mechanicRepository.save(existingMechanic);
    }

    public void deleteMechanic(Long id) {

        if (!mechanicRepository.existsById(id)) {
            throw new RuntimeException(
                    "Mechanic not found with ID: " + id);
        }

        mechanicRepository.deleteById(id);
    }
}