package com.shop.ecommerce.service;

import com.shop.ecommerce.model.Review;
import com.shop.ecommerce.model.User;
import com.shop.ecommerce.model.Product;
import com.shop.ecommerce.model.dto.ReviewRequest;
import com.shop.ecommerce.repository.ReviewRepository;
import com.shop.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public List<Review> getProductReviews(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    public Review addReview(Long productId, User user, ReviewRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Review review = new Review(user, product, request.getRating(), request.getComment(), request.getTitle());
        return reviewRepository.save(review);
    }
}
