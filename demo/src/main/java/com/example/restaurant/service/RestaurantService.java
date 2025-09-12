package com.example.restaurant.service;

import com.example.restaurant.model.Restaurant;

import java.util.List;

public interface RestaurantService {
    Restaurant createRestaurant(Restaurant restaurant);
    Restaurant getRestaurantById(Long id);
    List<Restaurant> getAllRestaurants();
    List<Restaurant> getRestaurantsByOwnerId(Long ownerId);
    Restaurant updateRestaurant(Long id, Restaurant updatedRestaurant);
    void deleteRestaurant(Long id);
}
