package com.adarisamuelprasad.backend.repo;

import com.adarisamuelprasad.backend.model.Experience;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepo extends MongoRepository<Experience, String> {
}
