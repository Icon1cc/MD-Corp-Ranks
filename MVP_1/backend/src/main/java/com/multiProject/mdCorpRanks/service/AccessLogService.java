package com.multiProject.mdCorpRanks.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccessLogService {

    private final JdbcTemplate jdbcTemplate;

    public void logCertificateAccess(UUID userId) {
        String sql = "INSERT INTO certificate_access_log (\"UserID\", \"AccessTime\") VALUES (?, NOW())";
        jdbcTemplate.update(sql, userId);
    }
}
 