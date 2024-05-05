package com.mdCorpRanks.Backend.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mdCorpRanks.Backend.Model.EmailSubscriptionRequest;
import com.mdCorpRanks.Backend.Model.UserResponseDTO;

import com.mdCorpRanks.Backend.Service.*;
import com.mdCorpRanks.Backend.Model.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST})
public class CookieController {

    private final UserService userService;
    private final ReviewService reviewService; 
    private final EmailSubscriptionService emailSubscriptionService;

    @GetMapping("/register")
    public ResponseEntity<UserResponseDTO> registerOrIdentifyUser(HttpServletRequest request, HttpServletResponse response) {
        UUID userId = extractUserIdFromCookies(request);
        boolean reviewAlreadyGiven = false;

        if (userId == null) {
            userId = userService.registerNewUser();
            addUserIdCookie(response, userId);
        } else {
            reviewAlreadyGiven = reviewService.checkIfReviewAlreadySubmitted(userId);
        }

        return ResponseEntity.ok(new UserResponseDTO(userId.toString(), reviewAlreadyGiven));
    }

    @PostMapping("/reviews")
    public ResponseEntity<ApiResponse> trackReviewSubmission(HttpServletRequest request) {
        UUID userId = extractUserIdFromCookies(request);
        if (userId == null) {
            return ResponseEntity.badRequest().body(new ApiResponse("User ID not found in cookies."));
        }
    
        boolean reviewAlreadySubmitted = reviewService.checkIfReviewAlreadySubmitted(userId);
        if (reviewAlreadySubmitted) {
            // Change to use ApiResponse to keep the response format consistent
            return ResponseEntity.ok(new ApiResponse("Review already submitted for user ID: " + userId));
        }
    
        reviewService.logReviewSubmission(userId);
        return ResponseEntity.ok(new ApiResponse("Review submission tracked successfully."));
    }
    
    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse> subscribeToEmail(HttpServletRequest request, @RequestBody EmailSubscriptionRequest subscriptionRequest) {
        UUID userId = extractUserIdFromCookies(request);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("User identification failed. User ID not found in cookies."));
        }
    
        String email = subscriptionRequest.getEmail();
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse("Email address is required."));
        }
    
        try {
            emailSubscriptionService.subscribeToEmail(userId, email);
            return ResponseEntity.ok(new ApiResponse("Email subscription successful."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed to subscribe to email. Please try again later."));
        }
    }

    private UUID extractUserIdFromCookies(HttpServletRequest request) {
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

    private void addUserIdCookie(HttpServletResponse response, UUID userId) {
        Cookie newUserCookie = new Cookie("userId", userId.toString());
        newUserCookie.setPath("/");
        newUserCookie.setHttpOnly(true);
        response.addCookie(newUserCookie);
    }
}
