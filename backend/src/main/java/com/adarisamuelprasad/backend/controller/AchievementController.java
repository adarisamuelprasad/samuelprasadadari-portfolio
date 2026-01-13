package com.adarisamuelprasad.backend.controller;

import com.adarisamuelprasad.backend.model.Achievement;
import com.adarisamuelprasad.backend.repo.AchievementRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080", "http://localhost:8081",
        "http://localhost:8082", "http://localhost:8083" })
public class AchievementController {

    private final AchievementRepo achievementRepo;

    public AchievementController(AchievementRepo achievementRepo) {
        this.achievementRepo = achievementRepo;
    }

    @GetMapping
    public List<Achievement> getAllAchievements() {
        return achievementRepo.findAll();
    }

    @PostMapping
    public Achievement createAchievement(@RequestBody Achievement achievement) {
        return achievementRepo.save(achievement);
    }

    @PutMapping("/{id}")
    public Achievement updateAchievement(@PathVariable String id, @RequestBody Achievement achievementDetails) {
        Achievement achievement = achievementRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found"));
        achievement.setTitle(achievementDetails.getTitle());
        achievement.setYear(achievementDetails.getYear());
        achievement.setDescription(achievementDetails.getDescription());
        achievement.setImageUrl(achievementDetails.getImageUrl());
        return achievementRepo.save(achievement);
    }

    @DeleteMapping("/{id}")
    public void deleteAchievement(@PathVariable String id) {
        achievementRepo.deleteById(id);
    }
}
