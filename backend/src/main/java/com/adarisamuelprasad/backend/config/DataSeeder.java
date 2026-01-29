package com.adarisamuelprasad.backend.config;

import com.adarisamuelprasad.backend.model.Achievement;
import com.adarisamuelprasad.backend.model.PortfolioContent;
import com.adarisamuelprasad.backend.model.Project;
import com.adarisamuelprasad.backend.repo.AchievementRepo;
import com.adarisamuelprasad.backend.repo.PortfolioContentRepo;
import com.adarisamuelprasad.backend.repo.ProjectRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

        private final PortfolioContentRepo contentRepo;
        private final AchievementRepo achievementRepo;
        private final ProjectRepo projectRepo;

        public DataSeeder(PortfolioContentRepo contentRepo, AchievementRepo achievementRepo, ProjectRepo projectRepo) {
                this.contentRepo = contentRepo;
                this.achievementRepo = achievementRepo;
                this.projectRepo = projectRepo;
        }

        @Override
        public void run(String... args) throws Exception {
                // Only seed if data is missing to avoid overwriting user changes
                if (contentRepo.count() == 0) {
                        seedHomeContent();
                        seedAboutContent();
                        seedContactContent();
                }

                if (achievementRepo.count() == 0) {
                        seedAchievements();
                }

                if (projectRepo.count() == 0) {
                        seedProjects();
                }
        }

        private void seedHomeContent() {
                // Seed always
                List<PortfolioContent> homeContent = Arrays.asList(
                                new PortfolioContent("home", "name", "Adari Samuel Prasad", "text"),
                                new PortfolioContent("home", "headline", "Java Developer | Spring Boot Developer",
                                                "text"),
                                new PortfolioContent("home", "subheadline",
                                                "AI & ML Enthusiast | Computer Vision Enthusiast", "text"),
                                new PortfolioContent("home", "description",
                                                "A passionate B.Tech student specializing in Artificial Intelligence & Machine Learning. I build scalable, intelligent, and automation-focused applications using Java, Spring Boot, and modern AI technologies. I aim to become a Future AI Engineer solving real-world problems with clean code and practical research.",
                                                "textarea"),
                                new PortfolioContent("home", "availabilityStatus", "Available for opportunities",
                                                "text"),
                                new PortfolioContent("home", "flashwords",
                                                "Java Developer, Spring Boot Developer, AI & ML Enthusiast, Computer Vision Enthusiast",
                                                "text"),
                                new PortfolioContent("home", "heroTechStackLabel", "Tech Stack:", "text"),
                                new PortfolioContent("home", "heroButtonPrimary", "View My Work", "text"),
                                new PortfolioContent("home", "heroButtonSecondary", "Get in Touch", "text"),
                                new PortfolioContent("home", "heroScrollText", "Scroll to explore", "text"),
                                new PortfolioContent("home", "heroBadge1", "Java Developer", "text"),
                                new PortfolioContent("home", "heroBadge2", "AI Enthusiast", "text"),
                                new PortfolioContent("home", "resumeUrl", "", "text"));
                contentRepo.saveAll(homeContent);
                System.out.println("Seeded Home content");
        }

        private void seedAboutContent() {
                // Seed always
                List<PortfolioContent> aboutContent = Arrays.asList(
                                new PortfolioContent("about", "subtitle", "Get to know the developer behind the code",
                                                "text"),
                                new PortfolioContent("about", "headline", "Backend & AI Developer", "text"),
                                new PortfolioContent("about", "description",
                                                "Passionate about software development, I specialize in building robust backend systems and implementing AI solutions that solve real-world problems.",
                                                "textarea"),
                                new PortfolioContent("about", "mission",
                                                "My journey began with a passion for algorithms and data structures, which evolved into expertise in distributed systems, microservices architecture, and machine learning. I believe in writing clean, maintainable code and following best practices in software engineering.",
                                                "textarea"),
                                new PortfolioContent("about", "education",
                                                "B.Tech in Artificial Intelligence & Machine Learning", "textarea"),
                                new PortfolioContent("about", "quickFactsTitle", "Quick Facts", "text"),
                                new PortfolioContent("about", "factRoleLabel", "Role", "text"),
                                new PortfolioContent("about", "factRoleValue", "Java Developer", "text"),
                                new PortfolioContent("about", "factFocusLabel", "Focus", "text"),
                                new PortfolioContent("about", "factFocusValue", "AI Enthusiast", "text"),
                                new PortfolioContent("about", "factStatLabel", "Coffee Cups", "text"),
                                new PortfolioContent("about", "factStatValue", "∞", "text"),
                                new PortfolioContent("about", "factExpLabel", "Status", "text"),
                                new PortfolioContent("about", "yearsOfExperience", "Fresher / Open for Work", "text"),
                                new PortfolioContent("about", "skillsTitle", "Skills & Technologies", "text"),
                                new PortfolioContent("about", "skillsSubtitle",
                                                "Tools and technologies I work with daily", "text"));
                contentRepo.saveAll(aboutContent);
                System.out.println("Seeded About content");
        }

        private void seedContactContent() {
                // Seed always
                List<PortfolioContent> contactContent = Arrays.asList(
                                new PortfolioContent("contact", "subtitle",
                                                "Have a project in mind? Let's work together", "text"),
                                new PortfolioContent("contact", "formTitle", "Get in Touch", "text"),
                                new PortfolioContent("contact", "formDescription",
                                                "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
                                                "textarea"),
                                new PortfolioContent("contact", "email", "samuelprasadadari1@gmail.com", "email"),
                                new PortfolioContent("contact", "form_email", "samuelprasadadari1@gmail.com", "email"),
                                new PortfolioContent("contact", "location", "India", "text"),
                                new PortfolioContent("contact", "buttonText", "Send Message", "text"),
                                new PortfolioContent("contact", "successMessage", "Message sent successfully!", "text"),
                                new PortfolioContent("contact", "phone", "", "text"),
                                new PortfolioContent("contact", "linkedin", "", "url"),
                                new PortfolioContent("contact", "github", "", "url"),
                                new PortfolioContent("contact", "twitter", "", "url"),
                                new PortfolioContent("contact", "website", "", "url"));
                contentRepo.saveAll(contactContent);
                System.out.println("Seeded Contact content");
        }

        private void seedAchievements() {
                // Seed always
                List<Achievement> achievements = Arrays.asList(
                                new Achievement("Google Cloud Hackathon Participant", "2025",
                                                "Participated in Google Cloud Hackathon, solving real-world cloud challenges."),
                                new Achievement("AI-Powered Gesture Recognition System", "2024",
                                                "Built a real-time app that translates hand gestures into speech for the deaf and mute using Python and OpenCV."),
                                new Achievement("AI Healthcare Apps", "2024",
                                                "Developed Spring Boot + AI healthcare applications for disease prediction."));
                achievementRepo.saveAll(achievements);
                System.out.println("Seeded Achievements");
        }

        private void seedProjects() {
                // Seed always
                List<Project> projects = Arrays.asList(
                                new Project("Health Care Intelligent Assistance",
                                                "AI-driven healthcare solution providing symptom analysis and doctor recommendations using Spring Boot and Machine Learning.",
                                                "Java, Spring Boot, React, Python, ML",
                                                "https://github.com/adarisamuelprasad",
                                                "https://healthcare-app-demo.com"),
                                new Project("DeVert Innovation Challenge",
                                                "A comprehensive platform for hackathons and innovation challenges with real-time evaluation and team management.",
                                                "Next.js, Firebase, Google Cloud",
                                                "https://github.com/adarisamuelprasad",
                                                "https://devert.in"),
                                new Project("Gesture to Speech Converter",
                                                "Real-time application converting sign language gestures into audible speech to assist the deaf and mute community.",
                                                "Python, OpenCV, TensorFlow, PyTtsDx3",
                                                "https://github.com/adarisamuelprasad",
                                                ""),
                                new Project("Portfolio Website",
                                                "A modern, responsive portfolio website built with React and Spring Boot to showcase skills and projects.",
                                                "React, TailwindCSS, Spring Boot, MongoDB",
                                                "https://github.com/adarisamuelprasad/portfolio",
                                                "https://your-portfolio.com"));
                projectRepo.saveAll(projects);
                System.out.println("Seeded Projects");
        }
}
