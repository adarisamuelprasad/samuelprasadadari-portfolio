package com.adarisamuelprasad.backend.controller;

import com.adarisamuelprasad.backend.model.PortfolioContent;
import com.adarisamuelprasad.backend.repo.PortfolioContentRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080", "http://localhost:8081",
        "http://localhost:8082", "http://localhost:8083" })
public class PortfolioContentController {

    private final PortfolioContentRepo contentRepo;

    public PortfolioContentController(PortfolioContentRepo contentRepo) {
        this.contentRepo = contentRepo;
    }

    @GetMapping
    public List<PortfolioContent> getAllContent() {
        return contentRepo.findAll();
    }

    @GetMapping("/{section}")
    public List<PortfolioContent> getContentBySection(@PathVariable String section) {
        return contentRepo.findBySection(section);
    }

    @PostMapping
    public PortfolioContent createContent(@RequestBody PortfolioContent content) {
        return contentRepo.save(content);
    }

    @PutMapping("/{id}")
    public PortfolioContent updateContent(@PathVariable String id, @RequestBody PortfolioContent contentDetails) {
        PortfolioContent content = contentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found"));
        content.setSection(contentDetails.getSection());
        content.setField(contentDetails.getField());
        content.setValue(contentDetails.getValue());
        content.setType(contentDetails.getType());
        return contentRepo.save(content);
    }

    @DeleteMapping("/{id}")
    public void deleteContent(@PathVariable String id) {
        contentRepo.deleteById(id);
    }

    // Bulk update endpoint for updating multiple content items at once
    @PutMapping("/bulk")
    public List<PortfolioContent> bulkUpdateContent(@RequestBody List<PortfolioContent> contents) {
        return contentRepo.saveAll(contents);
    }
}
