package com.mdCorpRanks.Backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mdCorpRanks.Backend.Service.*;
import com.mdCorpRanks.Backend.Model.*;
import com.mdCorpRanks.Backend.Utils.CookieHandling;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CookieController {

    private final UserService userService;
    private final ReviewService reviewService; 
    private final CookieHandling cookieHandling;

    @GetMapping("/register")
    public ResponseEntity<UserResponseDTO> registerOrIdentifyUser(HttpServletRequest request, HttpServletResponse response) {
        UUID userId = cookieHandling.extractUserIdFromCookies(request);
        boolean reviewAlreadyGiven = false;

        if (userId == null) {
            userId = userService.registerNewUser();
            cookieHandling.addUserIdCookie(response, userId);
        } else {
            reviewAlreadyGiven = reviewService.checkIfReviewAlreadySubmitted(userId);
        }

        return ResponseEntity.ok(new UserResponseDTO(userId.toString(), reviewAlreadyGiven));
    }
}
