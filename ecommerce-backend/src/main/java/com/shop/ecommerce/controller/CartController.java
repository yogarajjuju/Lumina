package com.shop.ecommerce.controller;

import com.shop.ecommerce.model.CartItem;
import com.shop.ecommerce.model.User;
import com.shop.ecommerce.model.dto.CartRequest;
import com.shop.ecommerce.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getCartItems(user));
    }

    @PostMapping
    public ResponseEntity<?> addToCart(@AuthenticationPrincipal User user, @RequestBody CartRequest request) {
        try {
            CartItem item = cartService.addToCart(user, request);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuantity(@AuthenticationPrincipal User user,
                                            @PathVariable Long id,
                                            @RequestBody Map<String, Integer> body) {
        try {
            CartItem item = cartService.updateQuantity(id, body.get("quantity"), user);
            return ResponseEntity.ok(item != null ? item : Map.of("message", "Item removed"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeFromCart(@AuthenticationPrincipal User user, @PathVariable Long id) {
        try {
            cartService.removeFromCart(id, user);
            return ResponseEntity.ok(Map.of("message", "Item removed from cart"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
