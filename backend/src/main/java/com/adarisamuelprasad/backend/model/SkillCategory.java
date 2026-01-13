package com.adarisamuelprasad.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "skill_categories")
public class SkillCategory {

    @Id
    private String id;

    private String categoryName; // e.g., "Frontend", "Backend", "Database"
    private Integer displayOrder; // Order to display categories
    private List<Skill> skills; // List of skills in this category

    public static class Skill {
        private String name; // e.g., "Java", "React"
        private String proficiency; // e.g., "Expert", "Intermediate", "Beginner"
        private String icon; // Optional icon/image URL

        public Skill() {
        }

        public Skill(String name, String proficiency, String icon) {
            this.name = name;
            this.proficiency = proficiency;
            this.icon = icon;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getProficiency() {
            return proficiency;
        }

        public void setProficiency(String proficiency) {
            this.proficiency = proficiency;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }
    }

    public SkillCategory() {
    }

    public SkillCategory(String categoryName, Integer displayOrder, List<Skill> skills) {
        this.categoryName = categoryName;
        this.displayOrder = displayOrder;
        this.skills = skills;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }
}
