package com.mdCorpRanks.Backend.Service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final JdbcTemplate jdbcTemplate;

    public void addRating(UUID userId, int questionId, int rating) {
        String sql = "INSERT INTO question_rating (\"UserID\", \"QuestionID\", \"Rating\", \"Timestamp\") VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, userId, questionId, rating, LocalDateTime.now());
    }
}
