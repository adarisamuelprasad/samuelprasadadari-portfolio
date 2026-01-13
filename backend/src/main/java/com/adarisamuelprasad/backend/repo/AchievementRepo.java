package com.adarisamuelprasad.backend.repo;

import com.adarisamuelprasad.backend.model.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AchievementRepo extends MongoRepository<Achievement, String> {
}
