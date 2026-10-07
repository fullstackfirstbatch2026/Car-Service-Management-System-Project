package com.autocare.autocare_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_jobs")
public class ServiceJob {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "job_id")
private Integer jobId;

@ManyToOne
@JoinColumn(name = "vehicle_id", nullable = false)
private Vehicle vehicle;

@ManyToOne
@JoinColumn(name = "mechanic_id")
private Mechanic mechanic;

@ManyToOne
@JoinColumn(name = "service_type_id", nullable = false)
private ServiceType serviceType;

@Column(name = "start_date")
private LocalDateTime startDate;

@Column(name = "completion_date")
private LocalDateTime completionDate;

@Column(name = "job_description")
private String description;

@Column(name = "priority")
private String priority;

@Column(name = "status")
private String status;

@Column(name = "labor_cost")
private BigDecimal laborCost;

@Column(name = "parts_cost")
private BigDecimal partsCost;

@Column(name = "total_cost")
private BigDecimal totalCost;

public ServiceJob() {
}

public Integer getJobId() {
    return jobId;
}

public void setJobId(Integer jobId) {
    this.jobId = jobId;
}

public Vehicle getVehicle() {
    return vehicle;
}

public void setVehicle(Vehicle vehicle) {
    this.vehicle = vehicle;
}

public Mechanic getMechanic() {
    return mechanic;
}

public void setMechanic(Mechanic mechanic) {
    this.mechanic = mechanic;
}

public ServiceType getServiceType() {
    return serviceType;
}

public void setServiceType(ServiceType serviceType) {
    this.serviceType = serviceType;
}

public LocalDateTime getStartDate() {
    return startDate;
}

public void setStartDate(LocalDateTime startDate) {
    this.startDate = startDate;
}

public LocalDateTime getCompletionDate() {
    return completionDate;
}

public void setCompletionDate(LocalDateTime completionDate) {
    this.completionDate = completionDate;
}

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

public String getPriority() {
    return priority;
}

public void setPriority(String priority) {
    this.priority = priority;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}

public BigDecimal getLaborCost() {
    return laborCost;
}

public void setLaborCost(BigDecimal laborCost) {
    this.laborCost = laborCost;
}

public BigDecimal getPartsCost() {
    return partsCost;
}

public void setPartsCost(BigDecimal partsCost) {
    this.partsCost = partsCost;
}

public BigDecimal getTotalCost() {
    return totalCost;
}

public void setTotalCost(BigDecimal totalCost) {
    this.totalCost = totalCost;
}


}
