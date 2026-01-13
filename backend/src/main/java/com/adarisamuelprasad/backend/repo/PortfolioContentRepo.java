package com.adarisamuelprasad.backend.repo;

import com.adarisamuelprasad.backend.model.PortfolioContent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PortfolioContentRepo extends MongoRepository<PortfolioContent, String> {
    List<PortfolioContent> findBySection(String section);

    PortfolioContent findBySectionAndField(String section, String field);
}
