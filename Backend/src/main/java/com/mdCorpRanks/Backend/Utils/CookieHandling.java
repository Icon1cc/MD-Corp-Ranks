package com.mdCorpRanks.Backend.Utils;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CookieHandling {
    
    private static final int COOKIE_MAX_AGE = 3600 * 24 * 365;
    private final Environment environment;

    public UUID extractUserIdFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }
        for (Cookie cookie : request.getCookies()) {
            if ("userId".equals(cookie.getName())) {
                try {
                    return UUID.fromString(cookie.getValue());
                } catch (IllegalArgumentException e) {
                    System.out.println("Invalid UUID format in cookie.");
                    return null;
                }
            }
        }
        return null;
    }

    public void addUserIdCookie(HttpServletResponse response, UUID userId) {
        final List<String> profiles = Arrays.asList(environment.getActiveProfiles());
        final boolean isAws = profiles.contains("aws");
        Cookie newUserCookie = new Cookie("userId", userId.toString());
        newUserCookie.setPath("/");
        newUserCookie.setHttpOnly(true);
        newUserCookie.setMaxAge(COOKIE_MAX_AGE);
        if (isAws) {
            newUserCookie.setSecure(true);
            newUserCookie.setAttribute("SameSite", "None");
        }
        response.addCookie(newUserCookie);
    }
}
