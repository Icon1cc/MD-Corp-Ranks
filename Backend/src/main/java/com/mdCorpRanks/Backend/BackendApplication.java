package com.mdCorpRanks.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import lombok.extern.java.Log;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
@Log
@RequiredArgsConstructor
public class BackendApplication implements CommandLineRunner{

    private final JdbcTemplate jdbcTemplate;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(final String... args) {
        log.info("Executing startup actions...");
        jdbcTemplate.execute("select * from user");
    }
}

