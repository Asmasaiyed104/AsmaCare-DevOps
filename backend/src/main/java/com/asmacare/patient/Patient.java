package com.asmacare.patient;

import jakarta.persistence.*;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String healthCardMasked;
    private String dateOfBirth;
    private String status;
    private String bloodPressure;
    private Integer heartRate;

    public Patient() {
    }

    public Patient(
            String fullName,
            String healthCardMasked,
            String dateOfBirth,
            String status,
            String bloodPressure,
            Integer heartRate) {

        this.fullName = fullName;
        this.healthCardMasked = healthCardMasked;
        this.dateOfBirth = dateOfBirth;
        this.status = status;
        this.bloodPressure = bloodPressure;
        this.heartRate = heartRate;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getHealthCardMasked() {
        return healthCardMasked;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public String getStatus() {
        return status;
    }

    public String getBloodPressure() {
        return bloodPressure;
    }

    public Integer getHeartRate() {
        return heartRate;
    }

    // Setters

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setHealthCardMasked(String healthCardMasked) {
        this.healthCardMasked = healthCardMasked;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }
}