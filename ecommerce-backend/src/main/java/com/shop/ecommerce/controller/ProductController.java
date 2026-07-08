package com.shop.ecommerce.controller;

import com.shop.ecommerce.model.Product;
import com.shop.ecommerce.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(productService.getAllProducts(page, size, sortBy, direction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Product>> searchProducts(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(productService.searchProducts(q, page, size));
    }

    @GetMapping("/deals")
    public ResponseEntity<List<Product>> getDeals() {
        return ResponseEntity.ok(productService.getDeals());
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Product>> getTrending() {
        return ResponseEntity.ok(productService.getTrending());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Product>> getFeatured() {
        return ResponseEntity.ok(productService.getFeatured());
    }

    @GetMapping("/deal-of-day")
    public ResponseEntity<List<Product>> getDealOfDay() {
        return ResponseEntity.ok(productService.getDealOfDay());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<Product>> getProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId, page, size, sortBy, direction));
    }
}
