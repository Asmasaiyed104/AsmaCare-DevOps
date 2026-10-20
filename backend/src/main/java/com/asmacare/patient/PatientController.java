package com.asmacare.patient;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientRepository repo;

    public PatientController(PatientRepository repo) {
        this.repo = repo;
    }

    // GET - Show all patients
    @GetMapping
    public List<Patient> all() {
        return repo.findAll();
    }

    // POST - Add a new patient
    @PostMapping
    public Patient create(@RequestBody Patient patient) {
        return repo.save(patient);
    }

    // PUT - Edit an existing patient
    @PutMapping("/{id}")
    public Patient update(
            @PathVariable Long id,
            @RequestBody Patient updatedPatient) {

        Patient patient = repo.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Patient not found"
                        ));

        patient.setFullName(updatedPatient.getFullName());
        patient.setHealthCardMasked(updatedPatient.getHealthCardMasked());
        patient.setDateOfBirth(updatedPatient.getDateOfBirth());
        patient.setStatus(updatedPatient.getStatus());
        patient.setBloodPressure(updatedPatient.getBloodPressure());
        patient.setHeartRate(updatedPatient.getHeartRate());

        return repo.save(patient);
    }

    // DELETE - Delete a patient
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        if (!repo.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Patient not found"
            );
        }

        repo.deleteById(id);
    }
}