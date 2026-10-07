package com.autocare.autocare_backend.service;

import com.autocare.autocare_backend.entity.Customer;
import com.autocare.autocare_backend.repository.CustomerRepository;
import com.autocare.autocare_backend.repository.VehicleRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final VehicleRepository vehicleRepository;

    public CustomerService(
            CustomerRepository customerRepository,
            VehicleRepository vehicleRepository) {

        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
    }

    // =========================
    // GET ALL CUSTOMERS
    // =========================

    public List<Customer> getAllCustomers() {

        return customerRepository.findAll();
    }

    // =========================
    // GET CUSTOMER BY ID
    // =========================

    public Customer getCustomerById(Long id) {

        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found with ID: " + id));
    }

    // =========================
    // CREATE CUSTOMER
    // =========================

    public Customer createCustomer(Customer customer) {

        return customerRepository.save(customer);
    }

    // =========================
    // UPDATE CUSTOMER
    // =========================

    public Customer updateCustomer(
            Long id,
            Customer updatedCustomer) {

        Customer existingCustomer =
                customerRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer not found with ID: " + id));

        existingCustomer.setName(updatedCustomer.getName());
        existingCustomer.setEmail(updatedCustomer.getEmail());
        existingCustomer.setPhone(updatedCustomer.getPhone());
        existingCustomer.setAddress(updatedCustomer.getAddress());

        return customerRepository.save(existingCustomer);
    }

    // =========================
    // DELETE CUSTOMER
    // =========================

    @Transactional
    public void deleteCustomer(Long id) {

        // Check whether customer exists
        if (!customerRepository.existsById(id)) {

            throw new RuntimeException(
                    "Customer not found with ID: " + id);
        }

        // Delete all vehicles belonging to this customer
        vehicleRepository.deleteByCustomerId(id);

        // Delete customer
        customerRepository.deleteById(id);
    }
}