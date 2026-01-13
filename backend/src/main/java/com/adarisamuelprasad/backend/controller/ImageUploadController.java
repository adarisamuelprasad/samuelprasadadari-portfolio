package com.adarisamuelprasad.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080", "http://localhost:8081",
        "http://localhost:8082", "http://localhost:8083" })
public class ImageUploadController {

    private final Path root = Paths.get("uploads");

    public ImageUploadController() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.root.resolve(filename));

            Map<String, String> response = new HashMap<>();
            // Assuming the server is running on localhost:9090, construct the URL
            // In production, this should be configurable
            String imageUrl = "http://localhost:9090/uploads/" + filename;
            response.put("url", imageUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }
}
