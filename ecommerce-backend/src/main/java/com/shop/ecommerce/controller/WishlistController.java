package com.shop.ecommerce.controller;

import com.shop.ecommerce.model.User;
import com.shop.ecommerce.model.Wishlist;
import com.shop.ecommerce.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public ResponseEntity<List<Wishlist>> getWishlist(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(wishlistService.getUserWishlist(user.getId()));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<?> addToWishlist(@AuthenticationPrincipal User user, @PathVariable Long productId) {
        try {
            Wishlist wishlist = wishlistService.addToWishlist(user, productId);
            return ResponseEntity.ok(wishlist);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromWishlist(@AuthenticationPrincipal User user, @PathVariable Long productId) {
        try {
            wishlistService.removeFromWishlist(user, productId);
            return ResponseEntity.ok(Map.of("message", "Removed from wishlist"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<Map<String, Boolean>> checkWishlist(@AuthenticationPrincipal User user, @PathVariable Long productId) {
        boolean inWishlist = wishlistService.isInWishlist(user.getId(), productId);
        return ResponseEntity.ok(Map.of("inWishlist", inWishlist));
    }
}
