package com.shop.ecommerce.controller;

import com.shop.ecommerce.model.Review;
import com.shop.ecommerce.model.User;
import com.shop.ecommerce.model.dto.ReviewRequest;
import com.shop.ecommerce.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products/{productId}/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getProductReviews(productId));
    }

    @PostMapping
    public ResponseEntity<?> addReview(@PathVariable Long productId,
                                       @AuthenticationPrincipal User user,
                                       @RequestBody ReviewRequest request) {
        try {
            Review review = reviewService.addReview(productId, user, request);
            return ResponseEntity.ok(review);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
