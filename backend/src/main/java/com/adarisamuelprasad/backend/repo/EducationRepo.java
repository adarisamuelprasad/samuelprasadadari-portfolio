package com.adarisamuelprasad.backend.repo;

import com.adarisamuelprasad.backend.model.Education;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepo extends MongoRepository<Education, String> {
}
