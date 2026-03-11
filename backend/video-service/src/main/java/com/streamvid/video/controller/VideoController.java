package com.streamvid.video.controller;

import com.streamvid.video.dto.VideoDTO;
import com.streamvid.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor

public class VideoController {

    private final VideoService videoService;

    @GetMapping
    public ResponseEntity<List<VideoDTO>> getAllVideos() {
        return ResponseEntity.ok(videoService.getAllVideos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoDTO> getVideoById(@PathVariable String id) {
        return ResponseEntity.ok(videoService.getVideoById(id));
    }

    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> checkVideoExists(@PathVariable String id) {
        return ResponseEntity.ok(videoService.existsById(id));
    }

    @PostMapping
    public ResponseEntity<VideoDTO> createVideo(@RequestBody VideoDTO videoDTO) {
        return ResponseEntity.ok(videoService.createVideo(videoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VideoDTO> updateVideo(@PathVariable String id, @RequestBody VideoDTO videoDTO) {
        return ResponseEntity.ok(videoService.updateVideo(id, videoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable String id) {
        videoService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }
}
