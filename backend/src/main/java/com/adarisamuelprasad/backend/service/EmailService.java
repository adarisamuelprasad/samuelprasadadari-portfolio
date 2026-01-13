package com.adarisamuelprasad.backend.service;

import com.adarisamuelprasad.backend.model.ContactMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @org.springframework.scheduling.annotation.Async
    public void sendContactEmail(ContactMessage contactMessage) {
        String subject = "📬 New Contact from " + contactMessage.getName();
        String text = "You received a new message from your portfolio website:\n\n" +
                "Name: " + contactMessage.getName() + "\n" +
                "Email: " + contactMessage.getEmail() + "\n\n" +
                "Message:\n" + contactMessage.getMessage();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(fromEmail);
        message.setSubject(subject);
        message.setText(text);

        try {
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to " + fromEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
            System.out.println("⚠️ Mock Email Content:\n" + text);
            // We swallow the exception so the frontend gets a success response
            // This is useful for development if SMTP is not configured correctly
        }
    }
}
