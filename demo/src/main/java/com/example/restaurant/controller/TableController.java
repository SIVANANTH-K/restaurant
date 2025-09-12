package com.example.restaurant.controller;

import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend (React) to call backend
public class TableController {

    @Autowired
    private TableService tableService;

    // ✅ Get all tables
    @GetMapping
    public List<RestaurantTable> getAllTables() {
        return tableService.getAllTables();
    }

    // ✅ Get a specific table by ID
    @GetMapping("/{id}")
    public RestaurantTable getTableById(@PathVariable Long id) {
        return tableService.getTableById(id).orElse(null);
    }

    // ✅ Check availability of a specific table
    @GetMapping("/{id}/availability")
    public boolean checkTableAvailability(@PathVariable Long id) {
        Optional<RestaurantTable> tableOpt = tableService.getTableById(id);
        return tableOpt.map(RestaurantTable::isAvailable).orElse(false);
    }

    // ✅ Create a new table
    @PostMapping
    public RestaurantTable createTable(@RequestBody RestaurantTable table) {
        return tableService.createTable(table);
    }

    // ✅ Update an existing table
    @PutMapping("/{id}")
    public RestaurantTable updateTable(@PathVariable Long id, @RequestBody RestaurantTable table) {
        return tableService.updateTable(id, table);
    }

     @GetMapping("/restaurant/{restaurantId}")
    public List<RestaurantTable> getTablesByRestaurant(@PathVariable Long restaurantId) {
        return tableService.getTablesByRestaurantId(restaurantId);
    }
    
    // ✅ Delete a table
    @DeleteMapping("/{id}")
    public String deleteTable(@PathVariable Long id) {
        boolean deleted = tableService.deleteTable(id);
        return deleted ? "Table deleted" : "Table not found";
    }
}
