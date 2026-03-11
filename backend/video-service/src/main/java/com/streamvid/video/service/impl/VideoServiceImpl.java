package com.streamvid.video.service.impl;

import com.streamvid.video.dto.VideoDTO;
import com.streamvid.video.entity.Video;
import com.streamvid.video.mapper.VideoMapper;
import com.streamvid.video.repository.VideoRepository;
import com.streamvid.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;
    private final VideoMapper videoMapper;

    @Override
    public List<VideoDTO> getAllVideos() {
        return videoRepository.findAll().stream()
                .map(videoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public VideoDTO getVideoById(String id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found"));
        return videoMapper.toDto(video);
    }

    @Override
    public VideoDTO createVideo(VideoDTO videoDTO) {
        Video video = videoMapper.toEntity(videoDTO);
        return videoMapper.toDto(videoRepository.save(video));
    }

    @Override
    public VideoDTO updateVideo(String id, VideoDTO videoDTO) {
        Video existing = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found"));

        existing.setTitle(videoDTO.getTitle());
        existing.setDescription(videoDTO.getDescription());
        existing.setThumbnailUrl(videoDTO.getThumbnailUrl());
        existing.setTrailerUrl(videoDTO.getTrailerUrl());
        existing.setDuration(videoDTO.getDuration());
        existing.setReleaseYear(videoDTO.getReleaseYear());
        existing.setType(videoDTO.getType());
        existing.setCategoryId(videoDTO.getCategoryId());
        existing.setRating(videoDTO.getRating());
        existing.setDirector(videoDTO.getDirector());
        existing.setCastMembers(videoDTO.getCastMembers());

        return videoMapper.toDto(videoRepository.save(existing));
    }

    @Override
    public void deleteVideo(String id) {
        videoRepository.deleteById(id);
    }

    @Override
    public boolean existsById(String id) {
        return videoRepository.existsById(id);
    }
}
