package com.example.restaurant.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "restaurant")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY) // only returned in responses
    private Long id;

    private Long ownerId;
    private String name;
    private String address;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY) // server controls approval
    private boolean approved;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @JsonManagedReference("restaurant-tables")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY) // prevent client from passing nested tables in create/update
    private List<RestaurantTable> tables;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }
    public List<RestaurantTable> getTables() { return tables; }
    public void setTables(List<RestaurantTable> tables) { this.tables = tables; }
}
