package com.streamvid.video.service;

import com.streamvid.video.dto.VideoDTO;
import java.util.List;

public interface VideoService {
    List<VideoDTO> getAllVideos();
    VideoDTO getVideoById(String id);
    VideoDTO createVideo(VideoDTO videoDTO);
    VideoDTO updateVideo(String id, VideoDTO videoDTO);
    void deleteVideo(String id);
    boolean existsById(String id);
}
