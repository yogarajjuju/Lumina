package com.shop.ecommerce.model.dto;

public class ReviewRequest {
    private Integer rating;
    private String comment;
    private String title;

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
