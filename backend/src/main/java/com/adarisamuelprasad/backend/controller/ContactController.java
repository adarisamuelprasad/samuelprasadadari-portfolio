package com.adarisamuelprasad.backend.controller;

import com.adarisamuelprasad.backend.model.ContactMessage;
import com.adarisamuelprasad.backend.service.EmailService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8080", "http://localhost:8081",
        "http://localhost:8082", "http://localhost:8083" })
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public void sendMessage(@RequestBody ContactMessage contactMessage) {
        emailService.sendContactEmail(contactMessage);
    }
}
