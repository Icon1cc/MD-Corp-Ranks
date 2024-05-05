package com.mdCorpRanks.Backend.Service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyRegistrationService {

    private final JdbcTemplate jdbcTemplate;

    public void registerCompanyName(UUID userId, String companyName) {
        String sql = "INSERT INTO company_name (\"UserID\", \"RegistrationTime\", \"CompanyName\") VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, userId, LocalDateTime.now(), companyName);
    }
}

