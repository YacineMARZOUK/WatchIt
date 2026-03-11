package com.streamvid.user.service;

import com.streamvid.user.client.VideoServiceClient;
import com.streamvid.user.dto.WatchlistDTO;
import com.streamvid.user.entity.Watchlist;
import com.streamvid.user.mapper.WatchlistMapper;
import com.streamvid.user.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final WatchlistMapper watchlistMapper;
    private final VideoServiceClient videoServiceClient;

    public List<WatchlistDTO> getUserWatchlist(String userId) {
        return watchlistRepository.findByUserId(userId).stream()
                .map(watchlistMapper::toDto)
                .collect(Collectors.toList());
    }

    public WatchlistDTO addToWatchlist(String userId, String videoId) {
        if (!videoServiceClient.checkVideoExists(videoId)) {
            throw new RuntimeException("Video does not exist!");
        }

        Watchlist item = new Watchlist();
        item.setUserId(userId);
        item.setVideoId(videoId);
        item.setAddedAt(java.time.Instant.now().toString());
        return watchlistMapper.toDto(watchlistRepository.save(item));
    }

    public void removeFromWatchlist(String userId, String videoId) {
        watchlistRepository.deleteByUserIdAndVideoId(userId, videoId);
    }
}
