package com.mdCorpRanks.Backend.Service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final JdbcTemplate jdbcTemplate;

    public boolean checkIfReviewAlreadySubmitted(UUID userId) {
        String sql = "SELECT COUNT(*) FROM review WHERE \"UserID\" = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count != null && count > 0;
    }

    public void logReviewSubmission(UUID userId) {
        LocalDateTime submissionTime = LocalDateTime.now();
        String sql = "INSERT INTO review (\"UserID\", \"ReviewTime\") VALUES (?, ?)";
        jdbcTemplate.update(sql, userId, submissionTime);
    }
}

