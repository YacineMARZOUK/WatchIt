package com.streamvid.user.service;

import com.streamvid.user.client.VideoServiceClient;
import com.streamvid.user.dto.HistoryDTO;
import com.streamvid.user.entity.History;
import com.streamvid.user.mapper.HistoryMapper;
import com.streamvid.user.repository.HistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final HistoryMapper historyMapper;
    private final VideoServiceClient videoServiceClient;

    public List<HistoryDTO> getUserHistory(String userId) {
        return historyRepository.findByUserId(userId).stream()
                .map(historyMapper::toDto)
                .collect(Collectors.toList());
    }

    public HistoryDTO updateHistory(String userId, String videoId, Integer progressTime, Boolean completed) {
        if (!videoServiceClient.checkVideoExists(videoId)) {
            throw new RuntimeException("Video does not exist!");
        }

        History history = historyRepository.findByUserIdAndVideoId(userId, videoId)
                .orElse(new History());
        
        history.setUserId(userId);
        history.setVideoId(videoId);
        history.setWatchedAt(java.time.Instant.now().toString());
        history.setProgressTime(progressTime);
        history.setCompleted(completed != null ? completed : history.getCompleted());

        return historyMapper.toDto(historyRepository.save(history));
    }
}
