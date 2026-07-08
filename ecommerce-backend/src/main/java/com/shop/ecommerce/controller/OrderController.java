package com.shop.ecommerce.controller;

import com.shop.ecommerce.model.Order;
import com.shop.ecommerce.model.User;
import com.shop.ecommerce.model.dto.OrderRequest;
import com.shop.ecommerce.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@AuthenticationPrincipal User user, @RequestBody OrderRequest request) {
        try {
            Order order = orderService.placeOrder(user, request);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.getUserOrders(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@AuthenticationPrincipal User user, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(orderService.getOrderById(id, user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
