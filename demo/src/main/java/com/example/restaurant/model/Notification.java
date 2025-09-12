package com.example.restaurant.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message; 

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    @Transient
    public Long getUserId() { return user != null ? user.getId() : null; }
    @Transient
    public void setUserId(Long userId) {
        if (this.user == null) this.user = new User();
        this.user.setId(userId);
    }
}
