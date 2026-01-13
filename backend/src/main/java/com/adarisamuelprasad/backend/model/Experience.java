package com.adarisamuelprasad.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "experience")
public class Experience {

    @Id
    private String id;

    private String company;
    private String role;
    private String duration; // E.g. "Jan 2023 - Present"
    private String description;
    private String location;

    public Experience() {
    }

    public Experience(String company, String role, String duration, String description, String location) {
        this.company = company;
        this.role = role;
        this.duration = duration;
        this.description = description;
        this.location = location;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
