package com.mdCorpRanks.Backend.Utils;

import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class CookieHandling {

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
        Cookie newUserCookie = new Cookie("userId", userId.toString());
        newUserCookie.setPath("/");
        newUserCookie.setHttpOnly(true);
        response.addCookie(newUserCookie);
    }
}
