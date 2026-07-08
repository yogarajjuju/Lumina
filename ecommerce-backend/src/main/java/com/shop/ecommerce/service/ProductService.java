package com.shop.ecommerce.service;

import com.shop.ecommerce.model.Product;
import com.shop.ecommerce.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getAllProducts(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        return productRepository.findAll(PageRequest.of(page, size, sort));
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Page<Product> getProductsByCategory(Long categoryId, int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        return productRepository.findByCategoryId(categoryId, PageRequest.of(page, size, sort));
    }

    public Page<Product> searchProducts(String query, int page, int size) {
        return productRepository.search(query, PageRequest.of(page, size));
    }

    public List<Product> getDeals() {
        return productRepository.findDeals(PageRequest.of(0, 12));
    }

    public List<Product> getTrending() {
        return productRepository.findTrending(PageRequest.of(0, 12));
    }

    public List<Product> getFeatured() {
        return productRepository.findByFeaturedTrue();
    }

    public List<Product> getDealOfDay() {
        return productRepository.findByDealOfDayTrue();
    }
}
