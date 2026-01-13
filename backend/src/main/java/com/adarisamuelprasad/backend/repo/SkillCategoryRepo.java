package com.adarisamuelprasad.backend.repo;

import com.adarisamuelprasad.backend.model.SkillCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SkillCategoryRepo extends MongoRepository<SkillCategory, String> {
    List<SkillCategory> findAllByOrderByDisplayOrderAsc();
}
