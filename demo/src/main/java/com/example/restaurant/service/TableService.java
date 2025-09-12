package com.example.restaurant.service;

import com.example.restaurant.model.Restaurant;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    public List<RestaurantTable> getAllTables() {
        return tableRepository.findAll();
    }

    public Optional<RestaurantTable> getTableById(Long id) {
        return tableRepository.findById(id);
    }

    public RestaurantTable createTable(RestaurantTable table) {
        return tableRepository.save(table);
    }

    public RestaurantTable updateTable(Long id, RestaurantTable updatedTable) {
        return tableRepository.findById(id).map(table -> {
            if (updatedTable.getRestaurantId() != null) {
                Restaurant r = new Restaurant();
                r.setId(updatedTable.getRestaurantId());
                table.setRestaurant(r);
            }
            table.setCapacity(updatedTable.getCapacity());
            table.setAvailable(updatedTable.isAvailable());
            return tableRepository.save(table);
        }).orElse(null);
    }

    public List<RestaurantTable> getTablesByRestaurantId(Long restaurantId) {
        return tableRepository.findByRestaurant_Id(restaurantId);
    }

    public boolean deleteTable(Long id) {
        if (tableRepository.existsById(id)) {
            tableRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
