package com.shop.ecommerce.repository;

import com.shop.ecommerce.model.Product;
import com.shop.ecommerce.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategory(Category category, Pageable pageable);
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :q, '%')) OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :q, '%'))")
    Page<Product> search(@Param("q") String query, Pageable pageable);

    List<Product> findByDealOfDayTrue();
    List<Product> findByFeaturedTrue();

    @Query("SELECT p FROM Product p ORDER BY p.rating DESC, p.reviewCount DESC")
    List<Product> findTrending(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.discount IS NOT NULL AND p.discount > 0 ORDER BY p.discount DESC")
    List<Product> findDeals(Pageable pageable);

    Page<Product> findByPriceBetween(Double minPrice, Double maxPrice, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category.id = :catId AND p.price BETWEEN :min AND :max")
    Page<Product> findByCategoryAndPriceRange(@Param("catId") Long categoryId, @Param("min") Double min, @Param("max") Double max, Pageable pageable);
}
