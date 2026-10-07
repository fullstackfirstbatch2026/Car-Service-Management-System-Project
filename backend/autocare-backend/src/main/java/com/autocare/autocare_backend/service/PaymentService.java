package com.autocare.autocare_backend.service;

import com.autocare.autocare_backend.entity.Payment;
import com.autocare.autocare_backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    // GET ALL
    public List<Payment> getAll() {
        return repository.findAll();
    }

    // GET BY ID
    public Payment getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found: " + id));
    }

    // CREATE
    public Payment create(Payment payment) {
        return repository.save(payment);
    }

    // UPDATE
    public Payment update(Integer id, Payment payment) {

        Payment existing = getById(id);

        existing.setServiceJob(payment.getServiceJob());
        existing.setAmount(payment.getAmount());
        existing.setPaymentDate(payment.getPaymentDate());
        existing.setPaymentMethod(payment.getPaymentMethod());
        existing.setPaymentStatus(payment.getPaymentStatus());

        return repository.save(existing);
    }

    // DELETE
    public void delete(Integer id) {
        Payment existing = getById(id);
        repository.delete(existing);
    }

    // GET PAYMENTS BY SERVICE JOB
    public List<Payment> getByJob(Integer jobId) {
        return repository.findByServiceJobJobId(jobId);
    }
}