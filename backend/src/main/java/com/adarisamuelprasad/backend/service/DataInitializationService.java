package com.adarisamuelprasad.backend.service;

import com.adarisamuelprasad.backend.model.PortfolioContent;
import com.adarisamuelprasad.backend.model.SkillCategory;
import com.adarisamuelprasad.backend.model.SkillCategory.Skill;
import com.adarisamuelprasad.backend.repo.PortfolioContentRepo;
import com.adarisamuelprasad.backend.repo.SkillCategoryRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DataInitializationService implements CommandLineRunner {

        private final PortfolioContentRepo contentRepo;
        private final SkillCategoryRepo skillCategoryRepo;

        public DataInitializationService(PortfolioContentRepo contentRepo, SkillCategoryRepo skillCategoryRepo) {
                this.contentRepo = contentRepo;
                this.skillCategoryRepo = skillCategoryRepo;
        }

        @Override
        public void run(String... args) throws Exception {
                // Initialize default content if database is empty
                if (contentRepo.count() == 0) {
                        initializeDefaultContent();
                }
                // Initialize skill categories if empty
                if (skillCategoryRepo.count() == 0) {
                        initializeSkillCategories();
                }
        }

        private void initializeDefaultContent() {
                // ========== HOME SECTION ==========
                contentRepo.save(new PortfolioContent("home", "name", "Adari Samuel Prasad", "text"));
                contentRepo.save(new PortfolioContent("home", "headline", "Java Developer | Spring Boot Developer",
                                "text"));
                contentRepo.save(new PortfolioContent("home", "subheadline",
                                "AI & ML Enthusiast | Computer Vision Enthusiast", "text"));
                contentRepo.save(new PortfolioContent("home", "description",
                                "A passionate B.Tech student specializing in Artificial Intelligence & Machine Learning. "
                                                +
                                                "I build scalable, intelligent, and automation-focused applications using Java, Spring Boot, and modern AI technologies. "
                                                +
                                                "I aim to become a Future AI Engineer solving real-world problems with clean code and practical research.",
                                "textarea"));
                contentRepo.save(new PortfolioContent("home", "profileImage", "/images/Samuel.jpg", "image"));
                contentRepo.save(new PortfolioContent("home", "availabilityStatus", "Available for opportunities",
                                "text"));
                contentRepo.save(new PortfolioContent("home", "resumeUrl", "", "url"));

                // ========== ABOUT SECTION ==========
                contentRepo.save(new PortfolioContent("about", "title", "About Me", "text"));
                contentRepo.save(new PortfolioContent("about", "description",
                                "I'm a passionate developer with expertise in building scalable applications using Java and Spring Boot. "
                                                +
                                                "My focus is on creating efficient, maintainable code and solving complex problems with innovative solutions. "
                                                +
                                                "I have a strong foundation in AI/ML technologies and love exploring new frameworks and tools.",
                                "textarea"));
                contentRepo.save(new PortfolioContent("about", "mission",
                                "To leverage technology to solve real-world problems and make a positive impact on society through innovative software solutions and AI-driven applications.",
                                "textarea"));
                contentRepo.save(new PortfolioContent("about", "yearsOfExperience", "2+", "text"));
                contentRepo.save(new PortfolioContent("about", "education",
                                "B.Tech in Computer Science & Engineering (AI & ML)\nCurrent Student | Expected Graduation: 2026",
                                "textarea"));
                contentRepo.save(new PortfolioContent("about", "aboutImage", "", "image"));

                // ========== SKILLS SECTION ==========
                contentRepo.save(new PortfolioContent("skills", "title", "Technical Skills", "text"));
                contentRepo.save(new PortfolioContent("skills", "description",
                                "Expert in Java, Spring Boot, and modern web technologies. " +
                                                "Passionate about AI/ML, building intelligent systems, and creating scalable backend applications.",
                                "textarea"));

                // Sample skills
                contentRepo.save(new PortfolioContent("skills", "skill_1", "Java", "text"));
                contentRepo.save(new PortfolioContent("skills", "skill_2", "Spring Boot", "text"));
                contentRepo.save(new PortfolioContent("skills", "skill_3", "React", "text"));
                contentRepo.save(new PortfolioContent("skills", "skill_4", "MongoDB", "text"));
                contentRepo.save(new PortfolioContent("skills", "skill_5", "Python", "text"));
                contentRepo.save(new PortfolioContent("skills", "skill_6", "Machine Learning", "text"));
                contentRepo.save(new PortfolioContent("skills", "skill_7", "REST APIs", "text"));
                contentRepo.save(new PortfolioContent("skills", "skill_8", "Git & GitHub", "text"));

                // ========== CONTACT SECTION ==========
                contentRepo.save(new PortfolioContent("contact", "email", "samuelprasadadari1@gmail.com", "email"));
                contentRepo.save(new PortfolioContent("contact", "phone", "+91 XXXXXXXXXX", "text"));
                contentRepo.save(new PortfolioContent("contact", "location", "India", "text"));
                contentRepo.save(new PortfolioContent("contact", "linkedin",
                                "https://www.linkedin.com/in/adarisamuelprasad", "url"));
                contentRepo.save(new PortfolioContent("contact", "github", "https://github.com/adarisamuelprasad",
                                "url"));
                contentRepo.save(new PortfolioContent("contact", "twitter", "", "url"));
                contentRepo.save(new PortfolioContent("contact", "website", "", "url"));

                System.out.println("✅ Default portfolio content initialized with all sections!");
        }

        private void initializeSkillCategories() {
                // ========== FRONTEND SKILLS ==========
                List<Skill> frontendSkills = Arrays.asList(
                                new Skill("React", "Advanced", ""),
                                new Skill("JavaScript", "Expert", ""),
                                new Skill("TypeScript", "Intermediate", ""),
                                new Skill("HTML5", "Expert", ""),
                                new Skill("CSS3", "Advanced", ""),
                                new Skill("Tailwind CSS", "Advanced", ""));

                SkillCategory frontend = new SkillCategory("Frontend Development", 1, frontendSkills);
                skillCategoryRepo.save(frontend);

                // ========== BACKEND SKILLS ==========
                List<Skill> backendSkills = Arrays.asList(
                                new Skill("Java", "Expert", ""),
                                new Skill("Spring Boot", "Expert", ""),
                                new Skill("Python", "Advanced", ""),
                                new Skill("Node.js", "Intermediate", ""),
                                new Skill("REST APIs", "Expert", ""),
                                new Skill("Microservices", "Advanced", ""));

                SkillCategory backend = new SkillCategory("Backend Development", 2, backendSkills);
                skillCategoryRepo.save(backend);

                // ========== DATABASE SKILLS ==========
                List<Skill> databaseSkills = Arrays.asList(
                                new Skill("MongoDB", "Advanced", ""),
                                new Skill("MySQL", "Advanced", ""),
                                new Skill("PostgreSQL", "Intermediate", ""),
                                new Skill("Redis", "Beginner", ""));

                SkillCategory database = new SkillCategory("Database & Storage", 3, databaseSkills);
                skillCategoryRepo.save(database);

                // ========== AI/ML SKILLS ==========
                List<Skill> aiMlSkills = Arrays.asList(
                                new Skill("Machine Learning", "Advanced", ""),
                                new Skill("TensorFlow", "Intermediate", ""),
                                new Skill("Computer Vision", "Advanced", ""),
                                new Skill("Natural Language Processing", "Intermediate", ""));

                SkillCategory aiMl = new SkillCategory("AI & Machine Learning", 4, aiMlSkills);
                skillCategoryRepo.save(aiMl);

                // ========== DEVOPS & TOOLS ==========
                List<Skill> devOpsSkills = Arrays.asList(
                                new Skill("Git & GitHub", "Expert", ""),
                                new Skill("Docker", "Advanced", ""),
                                new Skill("CI/CD", "Intermediate", ""),
                                new Skill("Linux", "Advanced", ""),
                                new Skill("AWS", "Intermediate", ""));

                SkillCategory devOps = new SkillCategory("DevOps & Tools", 5, devOpsSkills);
                skillCategoryRepo.save(devOps);

                System.out.println("✅ Default skill categories initialized with comprehensive skills!");
        }
}
