package com.autocare.autocare_backend.service;

import com.autocare.autocare_backend.entity.Vehicle;
import com.autocare.autocare_backend.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle not found with ID: " + id));
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {

        Vehicle existingVehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle not found with ID: " + id));

        existingVehicle.setCustomerId(updatedVehicle.getCustomerId());
        existingVehicle.setRegistrationNumber(updatedVehicle.getRegistrationNumber());
        existingVehicle.setBrand(updatedVehicle.getBrand());
        existingVehicle.setModel(updatedVehicle.getModel());
        existingVehicle.setManufactureYear(updatedVehicle.getManufactureYear());
        existingVehicle.setMileage(updatedVehicle.getMileage());

        return vehicleRepository.save(existingVehicle);
    }

    public void deleteVehicle(Long id) {

        if (!vehicleRepository.existsById(id)) {
            throw new RuntimeException(
                    "Vehicle not found with ID: " + id);
        }

        vehicleRepository.deleteById(id);
    }
}