package com.adarisamuelprasad.backend.controller;

import com.adarisamuelprasad.backend.model.SkillCategory;
import com.adarisamuelprasad.backend.repo.SkillCategoryRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080", "http://localhost:8081",
        "http://localhost:8082", "http://localhost:8083" })
public class SkillCategoryController {

    private final SkillCategoryRepo skillCategoryRepo;

    public SkillCategoryController(SkillCategoryRepo skillCategoryRepo) {
        this.skillCategoryRepo = skillCategoryRepo;
    }

    @GetMapping
    public List<SkillCategory> getAllSkillCategories() {
        return skillCategoryRepo.findAllByOrderByDisplayOrderAsc();
    }

    @PostMapping
    public SkillCategory createSkillCategory(@RequestBody SkillCategory skillCategory) {
        return skillCategoryRepo.save(skillCategory);
    }

    @PutMapping("/{id}")
    public SkillCategory updateSkillCategory(@PathVariable String id,
            @RequestBody SkillCategory skillCategoryDetails) {
        SkillCategory skillCategory = skillCategoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill category not found"));
        skillCategory.setCategoryName(skillCategoryDetails.getCategoryName());
        skillCategory.setDisplayOrder(skillCategoryDetails.getDisplayOrder());
        skillCategory.setSkills(skillCategoryDetails.getSkills());
        return skillCategoryRepo.save(skillCategory);
    }

    @DeleteMapping("/{id}")
    public void deleteSkillCategory(@PathVariable String id) {
        skillCategoryRepo.deleteById(id);
    }
}
