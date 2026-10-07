package com.autocare.autocare_backend.controller;

import com.autocare.autocare_backend.entity.Payment;
import com.autocare.autocare_backend.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService service) {
        this.service = service;
    }

    // GET ALL PAYMENTS
    @GetMapping
    public List<Payment> getAll() {
        return service.getAll();
    }

    // GET PAYMENT BY ID
    @GetMapping("/{id}")
    public Payment getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // GET PAYMENTS BY SERVICE JOB
    @GetMapping("/job/{jobId}")
    public List<Payment> getByJob(@PathVariable Integer jobId) {
        return service.getByJob(jobId);
    }

    // CREATE PAYMENT
    @PostMapping
    public Payment create(@RequestBody Payment payment) {
        return service.create(payment);
    }

    // UPDATE PAYMENT
    @PutMapping("/{id}")
    public Payment update(
            @PathVariable Integer id,
            @RequestBody Payment payment) {

        return service.update(id, payment);
    }

    // DELETE PAYMENT
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}