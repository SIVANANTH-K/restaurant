package com.example.restaurant.repository;

import com.example.restaurant.model.Reservation;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findTopByTable_IdOrderByReservationTimeDesc(Long tableId);
}
