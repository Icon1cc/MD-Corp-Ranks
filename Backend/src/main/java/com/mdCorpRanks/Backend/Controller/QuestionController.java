package com.mdCorpRanks.Backend.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mdCorpRanks.Backend.Service.*;
import com.mdCorpRanks.Backend.Model.*;
import com.mdCorpRanks.Backend.Utils.*;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final RatingService ratingService;
    private final CookieHandling cookieHandling;

    @GetMapping
    public ResponseEntity<?> getQuestions(HttpServletRequest request) {
        UUID userId = cookieHandling.extractUserIdFromCookies(request);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Authentication failed. No valid user ID found in cookies."));
        }

        try {
            List<QuestionResponseDTO> questions = questionService.getAllQuestions();
            return ResponseEntity.ok(Collections.singletonMap("questions", questions));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed to retrieve questions."));
        }
    }


    @PostMapping("/{id}/ratings")
    public ResponseEntity<ApiResponse> addQuestionRating(HttpServletRequest request, @PathVariable int id, @RequestBody RatingRequestDTO ratingRequest) {
        UUID userId = cookieHandling.extractUserIdFromCookies(request);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Authentication failed. No valid user ID found in cookies."));
        }

        try {
            ratingService.addRating(userId, id, ratingRequest.getRating());
            return ResponseEntity.ok(new ApiResponse("Rating submitted successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed to submit rating. Please try again later."));
        }
    }
}
