package com.adarisamuelprasad.backend.controller;

import com.adarisamuelprasad.backend.model.Education;
import com.adarisamuelprasad.backend.repo.EducationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080", "http://localhost:8081",
        "http://localhost:8082", "http://localhost:8083" })
public class EducationController {

    @Autowired
    private EducationRepo educationRepo;

    @GetMapping
    public List<Education> getAll() {
        return educationRepo.findAll();
    }

    @PostMapping
    public Education create(@RequestBody Education education) {
        return educationRepo.save(education);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> update(@PathVariable String id, @RequestBody Education educationDetails) {
        return educationRepo.findById(id)
                .map(education -> {
                    education.setInstitution(educationDetails.getInstitution());
                    education.setDegree(educationDetails.getDegree());
                    education.setYears(educationDetails.getYears());
                    education.setDescription(educationDetails.getDescription());
                    education.setGrade(educationDetails.getGrade());
                    return ResponseEntity.ok(educationRepo.save(education));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (educationRepo.existsById(id)) {
            educationRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
