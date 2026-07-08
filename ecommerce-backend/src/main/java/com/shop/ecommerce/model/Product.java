package com.shop.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private Double price;

    private Double originalPrice;
    private Integer discount;
    private Integer stock;
    private String imageUrl;
    private String brand;
    private Double rating;
    private Integer reviewCount;
    private Boolean featured = false;
    private Boolean dealOfDay = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    public Product() {}

    public Product(String name, String description, Double price, Double originalPrice,
                   Integer discount, Integer stock, String imageUrl, String brand,
                   Double rating, Integer reviewCount, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.originalPrice = originalPrice;
        this.discount = discount;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.brand = brand;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.category = category;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }
    public Integer getDiscount() { return discount; }
    public void setDiscount(Integer discount) { this.discount = discount; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }
    public Boolean getDealOfDay() { return dealOfDay; }
    public void setDealOfDay(Boolean dealOfDay) { this.dealOfDay = dealOfDay; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}
