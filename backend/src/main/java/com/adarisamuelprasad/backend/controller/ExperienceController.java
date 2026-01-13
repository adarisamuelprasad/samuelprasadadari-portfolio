package com.adarisamuelprasad.backend.controller;

import com.adarisamuelprasad.backend.model.Experience;
import com.adarisamuelprasad.backend.repo.ExperienceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080", "http://localhost:8081",
        "http://localhost:8082", "http://localhost:8083" })
public class ExperienceController {

    @Autowired
    private ExperienceRepo experienceRepo;

    @GetMapping
    public List<Experience> getAll() {
        return experienceRepo.findAll();
    }

    @PostMapping
    public Experience create(@RequestBody Experience experience) {
        return experienceRepo.save(experience);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> update(@PathVariable String id, @RequestBody Experience experienceDetails) {
        return experienceRepo.findById(id)
                .map(experience -> {
                    experience.setCompany(experienceDetails.getCompany());
                    experience.setRole(experienceDetails.getRole());
                    experience.setDuration(experienceDetails.getDuration());
                    experience.setDescription(experienceDetails.getDescription());
                    experience.setLocation(experienceDetails.getLocation());
                    return ResponseEntity.ok(experienceRepo.save(experience));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (experienceRepo.existsById(id)) {
            experienceRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
