package com.example.restaurant.controller;

import com.example.restaurant.model.Reservation;
import com.example.restaurant.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Create reservation
    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @GetMapping
    public List<Reservation> getAllReservation() {
        return reservationService.getAllReservation();
    }

    // Get reservation by ID
    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }


    // Update confirmed status
    @PatchMapping("/{id}/confirm")
    public Reservation confirmReservation(@PathVariable Long id, @RequestParam boolean confirmed) {
        return reservationService.updateReservationConfirmed(id, confirmed);
    }

    // Get latest reservation for a table
    @GetMapping("/latest/{tableId}")
    public Optional<Reservation> getLatestReservation(@PathVariable Long tableId) {
        return reservationService.getLatestReservationForTable(tableId);
    }
}
