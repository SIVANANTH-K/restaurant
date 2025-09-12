package com.example.restaurant.service;

import com.example.restaurant.model.Notification;
import com.example.restaurant.model.Reservation;
import com.example.restaurant.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public Reservation updateReservationConfirmed(Long id, boolean confirmed) {
        Optional<Reservation> optional = reservationRepository.findById(id);
        if (optional.isPresent()) {
            Reservation res = optional.get();
            res.setConfirmed(confirmed);
            return reservationRepository.save(res);
        }
        return null; // or throw exception
    }

    public Optional<Reservation> getLatestReservationForTable(Long tableId) {
        return reservationRepository.findTopByTable_IdOrderByReservationTimeDesc(tableId);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public LocalDateTime getNextAvailableTime(Long tableId) {
        Optional<Reservation> lastRes = getLatestReservationForTable(tableId);
        return lastRes.map(res -> res.getReservationTime().plusHours(2)).orElse(LocalDateTime.now());
    }
}
