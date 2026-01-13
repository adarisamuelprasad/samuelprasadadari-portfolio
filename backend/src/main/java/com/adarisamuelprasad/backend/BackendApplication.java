package com.adarisamuelprasad.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@org.springframework.scheduling.annotation.EnableAsync
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@org.springframework.context.annotation.Bean
	public org.springframework.boot.CommandLineRunner loadData(
			com.adarisamuelprasad.backend.repo.ProjectRepo projectRepo,
			org.springframework.data.mongodb.core.MongoTemplate mongoTemplate) {
		return args -> {
			// Migration: Fix _class field for renamed packages
			mongoTemplate.updateMulti(
					new org.springframework.data.mongodb.core.query.Query(
							org.springframework.data.mongodb.core.query.Criteria.where("_class")
									.regex("^com\\.coderscanvas\\.")),
					org.springframework.data.mongodb.core.query.Update.update("_class",
							"com.adarisamuelprasad.backend.model.Project"),
					"projects");

			if (projectRepo.count() == 0) {
				projectRepo.save(new com.adarisamuelprasad.backend.model.Project(
						"AI Health Assistant",
						"A deep learning-based system that predicts diseases from symptoms.",
						"Java, Spring Boot, TensorFlow",
						"https://github.com/samuel/ai-health-assistant",
						"https://aihealth.samuel.dev"));
				projectRepo.save(new com.adarisamuelprasad.backend.model.Project(
						"Gesture Recognition App",
						"A real-time app that translates hand gestures into speech for the deaf and mute.",
						"Python, OpenCV, Flask",
						"https://github.com/samuel/gesture-app",
						"https://gesture.samuel.dev"));
				projectRepo.save(new com.adarisamuelprasad.backend.model.Project(
						"Portfolio Website",
						"A full-stack personal portfolio web app with projects, contact, and resume.",
						"HTML, CSS, JavaScript, Spring Boot",
						"https://github.com/samuel/portfolio",
						"https://portfolio.samuel.dev"));
			}
		};
	}

}
