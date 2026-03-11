package com.streamvid.user.controller;

import com.streamvid.user.dto.WatchlistDTO;
import com.streamvid.user.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/watchlist")
@RequiredArgsConstructor

public class WatchlistController {

    private final WatchlistService watchlistService;

    @GetMapping
    public ResponseEntity<List<WatchlistDTO>> getUserWatchlist(@PathVariable String userId) {
        return ResponseEntity.ok(watchlistService.getUserWatchlist(userId));
    }

    @PostMapping("/{videoId}")
    public ResponseEntity<WatchlistDTO> addToWatchlist(@PathVariable String userId, @PathVariable String videoId) {
        return ResponseEntity.ok(watchlistService.addToWatchlist(userId, videoId));
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity<Void> removeFromWatchlist(@PathVariable String userId, @PathVariable String videoId) {
        watchlistService.removeFromWatchlist(userId, videoId);
        return ResponseEntity.noContent().build();
    }
}
