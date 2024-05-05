package com.mdCorpRanks.Backend.Service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailSubscriptionService {

    private final JdbcTemplate jdbcTemplate;

    public void subscribeToEmail(UUID userId, String email) {
        LocalDateTime subscribedOn = LocalDateTime.now();
        String sql = "INSERT INTO email_subscription (\"UserID\", \"Email\", \"SubscribedOn\") VALUES (?, ?, ?) " +
                     "ON CONFLICT (\"UserID\") DO UPDATE SET " +
                     "\"Email\" = EXCLUDED.\"Email\", \"SubscribedOn\" = EXCLUDED.\"SubscribedOn\";";
        try {
            jdbcTemplate.update(sql, userId, email, subscribedOn);
            log.info("Subscription updated for user ID: {}", userId);
        } catch (Exception e) {
            log.error("Failed to insert or update into database", e);
        }
    }
}

