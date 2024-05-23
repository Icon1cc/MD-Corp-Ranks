package com.multiProject.mdCorpRanks.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JdbcTemplate jdbcTemplate;

    // Local cache to minimize database queries for known users
    private final Map<UUID, Boolean> knownUsers = new ConcurrentHashMap<>();

    public boolean isUserKnown(UUID userId) {
        // Check local cache first
        return knownUsers.containsKey(userId);
    }

    public boolean checkUserExists(UUID userId) {
        // Check the database if the user is not known locally
        if (!isUserKnown(userId)) {
            String sql = "SELECT COUNT(*) FROM \"user\" WHERE \"UserID\" = ?";
            Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
            boolean exists = count != null && count > 0;
            if (exists) {
                knownUsers.put(userId, true);
            }
            return exists;
        }
        return true; // User is known locally, no need to query the database
    }

    public UUID registerNewUser() {
        UUID newUserId = UUID.randomUUID();
        String sql = "INSERT INTO \"user\" (\"UserID\", \"RegistrationTime\") VALUES (?, ?)";
        jdbcTemplate.update(sql, newUserId, LocalDateTime.now());
        knownUsers.put(newUserId, true); // Cache as known
        return newUserId;
    }
}
