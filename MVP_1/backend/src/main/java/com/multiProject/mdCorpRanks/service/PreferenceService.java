package com.multiProject.mdCorpRanks.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PreferenceService {

    private final JdbcTemplate jdbcTemplate;

    public void savePreference(UUID userId, String identityPreference, String reviewPreference) {
        LocalDateTime executionTime = LocalDateTime.now();
        String sql = "INSERT INTO preference (\"UserID\", \"ExecutionTime\", \"IdentityPreference\", \"ReviewPreference\") VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, userId, executionTime, identityPreference, reviewPreference);
    }
}
