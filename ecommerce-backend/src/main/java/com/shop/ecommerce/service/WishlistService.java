package com.shop.ecommerce.service;

import com.shop.ecommerce.model.Wishlist;
import com.shop.ecommerce.model.User;
import com.shop.ecommerce.model.Product;
import com.shop.ecommerce.repository.WishlistRepository;
import com.shop.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository, ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
    }

    public List<Wishlist> getUserWishlist(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    public Wishlist addToWishlist(User user, Long productId) {
        if (wishlistRepository.existsByUserIdAndProductId(user.getId(), productId)) {
            throw new RuntimeException("Product already in wishlist");
        }
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return wishlistRepository.save(new Wishlist(user, product));
    }

    public void removeFromWishlist(User user, Long productId) {
        Wishlist wishlist = wishlistRepository.findByUserIdAndProductId(user.getId(), productId)
                .orElseThrow(() -> new RuntimeException("Item not in wishlist"));
        wishlistRepository.delete(wishlist);
    }

    public boolean isInWishlist(Long userId, Long productId) {
        return wishlistRepository.existsByUserIdAndProductId(userId, productId);
    }
}
