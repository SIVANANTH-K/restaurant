package com.example.restaurant.repository;

import com.example.restaurant.model.RestaurantTable;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRepository extends JpaRepository<RestaurantTable, Long> {
    List<RestaurantTable> findByRestaurant_Id(Long restaurantId);
}
