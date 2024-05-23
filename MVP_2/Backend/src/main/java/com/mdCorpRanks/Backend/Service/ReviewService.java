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

    public int calculateWeightedAverage(UUID userId) {
        String sql = "SELECT SUM((\"Rating\" * 20) * \"Weight\") / SUM(\"Weight\") AS WeightedAverage " +
                     "FROM LatestRating " +
                     "WHERE \"UserID\" = ? " +
                     "GROUP BY \"UserID\";";
        Double average = jdbcTemplate.queryForObject(sql, Double.class, userId);
        return average != null ? average.intValue() : 0; 
    }

    public void logFarewell(UUID userId) {
        LocalDateTime exitTime = LocalDateTime.now();
        String sql = "INSERT INTO page_exit (\"UserID\", \"ExitTime\") VALUES (?, ?)";
        jdbcTemplate.update(sql, userId, exitTime);
    }
}