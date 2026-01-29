package com.adarisamuelprasad.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "portfolio_content")
public class PortfolioContent {

    @Id
    private String id;

    private String section; // "home", "about", "skills", "contact"
    private String field; // "headline", "subheadline", "description", "email", etc.
    private String value; // The actual content
    private String type; // "text", "textarea", "image", "email", "phone", "url"
    private String textSize; // e.g., "text-sm", "text-xl", "text-4xl"

    public PortfolioContent() {
    }

    public PortfolioContent(String section, String field, String value, String type) {
        this.section = section;
        this.field = field;
        this.value = value;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTextSize() {
        return textSize;
    }

    public void setTextSize(String textSize) {
        this.textSize = textSize;
    }
}
