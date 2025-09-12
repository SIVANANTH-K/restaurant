package com.example.restaurant.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "tables")
public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int capacity;
    private boolean available;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "tables"})
    private Restaurant restaurant;

    @OneToOne(mappedBy = "table", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("table")
    private Reservation reservation;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }
    public Reservation getReservation() { return reservation; }
    public void setReservation(Reservation reservation) { this.reservation = reservation; }

    @JsonProperty("restaurant_id")
public Long getRestaurantId() {
    return restaurant != null ? restaurant.getId() : null;
}

@JsonProperty("restaurant_id")
public void setRestaurantId(Long restaurantId) {
    if (this.restaurant == null) {
        this.restaurant = new Restaurant();
    }
    this.restaurant.setId(restaurantId);
}

}
