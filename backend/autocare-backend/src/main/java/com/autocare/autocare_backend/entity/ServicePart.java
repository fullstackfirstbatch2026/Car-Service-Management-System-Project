package com.autocare.autocare_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "service_parts")
public class ServicePart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_part_id")
    private Integer servicePartId;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private ServiceJob serviceJob;

    @ManyToOne
    @JoinColumn(name = "part_id", nullable = false)
    private Part part;

    @Column(name = "quantity")
    private Integer quantity;

    public ServicePart() {}

    public Integer getServicePartId() {
        return servicePartId;
    }

    public void setServicePartId(Integer servicePartId) {
        this.servicePartId = servicePartId;
    }

    public ServiceJob getServiceJob() {
        return serviceJob;
    }

    public void setServiceJob(ServiceJob serviceJob) {
        this.serviceJob = serviceJob;
    }

    public Part getPart() {
        return part;
    }

    public void setPart(Part part) {
        this.part = part;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}