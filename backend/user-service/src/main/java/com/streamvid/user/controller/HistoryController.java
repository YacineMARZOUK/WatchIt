package com.streamvid.user.controller;

import com.streamvid.user.dto.HistoryDTO;
import com.streamvid.user.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping
    public ResponseEntity<List<HistoryDTO>> getUserHistory(@PathVariable String userId) {
        return ResponseEntity.ok(historyService.getUserHistory(userId));
    }

    @PostMapping("/{videoId}")
    public ResponseEntity<HistoryDTO> updateHistory(
            @PathVariable String userId,
            @PathVariable String videoId,
            @RequestParam Integer progressTime,
            @RequestParam(required = false) Boolean completed) {
        return ResponseEntity.ok(historyService.updateHistory(userId, videoId, progressTime, completed));
    }
}
