package com.adarisamuelprasad.backend.controller;

import com.adarisamuelprasad.backend.model.Project;
import com.adarisamuelprasad.backend.repo.ProjectRepo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080", "http://localhost:8081",
        "http://localhost:8082", "http://localhost:8083" }) // Allow Vite frontend
public class ProjectController {

    private final ProjectRepo projectRepo;

    public ProjectController(ProjectRepo projectRepo) {
        this.projectRepo = projectRepo;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    @org.springframework.web.bind.annotation.PostMapping
    public Project createProject(@org.springframework.web.bind.annotation.RequestBody Project project) {
        return projectRepo.save(project);
    }

    @org.springframework.web.bind.annotation.PutMapping("/{id}")
    public Project updateProject(@org.springframework.web.bind.annotation.PathVariable String id,
            @org.springframework.web.bind.annotation.RequestBody Project projectDetails) {
        Project project = projectRepo.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        project.setTechnologies(projectDetails.getTechnologies());
        project.setRepoUrl(projectDetails.getRepoUrl());
        project.setLiveUrl(projectDetails.getLiveUrl());
        project.setImageUrl(projectDetails.getImageUrl());
        return projectRepo.save(project);
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/{id}")
    public void deleteProject(@org.springframework.web.bind.annotation.PathVariable String id) {
        projectRepo.deleteById(id);
    }
}
