package com.example.restaurant.service.impl;

import com.example.restaurant.model.Restaurant;
import com.example.restaurant.repository.RestaurantRepository;
import com.example.restaurant.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> getRestaurantsByOwnerId(Long ownerId) {
        return restaurantRepository.findByOwnerId(ownerId);
    }

    @Override
    public Restaurant updateRestaurant(Long id, Restaurant updatedRestaurant) {
        Optional<Restaurant> optional = restaurantRepository.findById(id);
        if (optional.isPresent()) {
            Restaurant r = optional.get();
            r.setName(updatedRestaurant.getName());
            r.setAddress(updatedRestaurant.getAddress());
            r.setOwnerId(updatedRestaurant.getOwnerId());
            r.setApproved(updatedRestaurant.isApproved());
            return restaurantRepository.save(r);
        } else {
            return null;
        }
    }

    @Override
    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);
    }
}
