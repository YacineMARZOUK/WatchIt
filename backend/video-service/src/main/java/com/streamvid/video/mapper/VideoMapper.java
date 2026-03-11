package com.streamvid.video.mapper;

import com.streamvid.video.dto.VideoDTO;
import com.streamvid.video.entity.Video;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VideoMapper {
    VideoDTO toDto(Video video);
    Video toEntity(VideoDTO dto);
}
