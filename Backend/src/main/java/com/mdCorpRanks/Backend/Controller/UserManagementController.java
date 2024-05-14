package com.mdCorpRanks.Backend.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mdCorpRanks.Backend.Service.*;
import com.mdCorpRanks.Backend.Model.*;
import com.mdCorpRanks.Backend.Utils.*;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserManagementController {

    private final EmailSubscriptionService emailSubscriptionService;
    private final CompanyRegistrationService companyRegistrationService;
    private final CookieHandling cookieHandling;
        
    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse> subscribeToEmail(HttpServletRequest request, @RequestBody EmailSubscriptionRequest subscriptionRequest) {
        UUID userId = cookieHandling.extractUserIdFromCookies(request);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Authentication failed. No valid user ID found in cookies."));
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

    @PostMapping("/companies")
    public ResponseEntity<ApiResponse> companyName(HttpServletRequest request, @RequestBody CompanyNameRequest nameRequest) {
        UUID userId = cookieHandling.extractUserIdFromCookies(request);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Authentication failed. No valid user ID found in cookies."));
        }
    
        String companyName = nameRequest.getCompanyName();
        if (companyName == null || companyName.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse("Company Name is required."));
        }
    
        try {
            companyRegistrationService.registerCompanyName(userId, companyName);
            return ResponseEntity.ok(new ApiResponse("Company name registered successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed to register company name. Please try again later."));
        }
    }
}
