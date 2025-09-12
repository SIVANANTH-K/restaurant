package com.example.restaurant.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long restaurantId;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime reservationTime;
    private boolean confirmed;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonBackReference("user-reservations")
    private User user;

    @OneToOne
    @JoinColumn(name = "table_id", unique = true)
    @JsonBackReference("table-reservation")
    private RestaurantTable table;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Transient
    public Long getUserId() {
        return user != null ? user.getId() : null;
    }
    
    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public LocalDateTime getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(LocalDateTime reservationTime) {
        this.reservationTime = reservationTime;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public RestaurantTable getTable() {
        return table;
    }

    public void setTable(RestaurantTable table) {
        this.table = table;
    }

    @Transient
    public Long getTableId() {
        return table != null ? table.getId() : null;
    }

    @Transient
    public void setTableId(Long tableId) {
        if (this.table == null) {
            this.table = new RestaurantTable();
        }
        this.table.setId(tableId);
    }

    @Transient
public void setUserId(Long userId) {
    if (this.user == null) {
        this.user = new User();
    }
    this.user.setId(userId);
}


    @Transient
public LocalDateTime getReservationEndTime() {
    return reservationTime != null ? reservationTime.plusHours(2) : null;
}
}
