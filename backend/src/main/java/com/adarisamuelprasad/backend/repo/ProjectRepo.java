package com.adarisamuelprasad.backend.repo;

import com.adarisamuelprasad.backend.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo extends MongoRepository<Project, String> {
}
