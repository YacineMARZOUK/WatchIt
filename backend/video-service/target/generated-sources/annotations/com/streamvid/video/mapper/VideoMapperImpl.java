package com.streamvid.video.mapper;

import com.streamvid.video.dto.VideoDTO;
import com.streamvid.video.entity.Video;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-11T08:47:39+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Eclipse Adoptium)"
)
@Component
public class VideoMapperImpl implements VideoMapper {

    @Override
    public VideoDTO toDto(Video video) {
        if ( video == null ) {
            return null;
        }

        VideoDTO videoDTO = new VideoDTO();

        videoDTO.setId( video.getId() );
        videoDTO.setTitle( video.getTitle() );
        videoDTO.setDescription( video.getDescription() );
        videoDTO.setThumbnailUrl( video.getThumbnailUrl() );
        videoDTO.setTrailerUrl( video.getTrailerUrl() );
        videoDTO.setDuration( video.getDuration() );
        videoDTO.setReleaseYear( video.getReleaseYear() );
        videoDTO.setType( video.getType() );
        videoDTO.setCategoryId( video.getCategoryId() );
        videoDTO.setRating( video.getRating() );
        videoDTO.setDirector( video.getDirector() );
        List<String> list = video.getCastMembers();
        if ( list != null ) {
            videoDTO.setCastMembers( new ArrayList<String>( list ) );
        }

        return videoDTO;
    }

    @Override
    public Video toEntity(VideoDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Video.VideoBuilder video = Video.builder();

        video.id( dto.getId() );
        video.title( dto.getTitle() );
        video.description( dto.getDescription() );
        video.thumbnailUrl( dto.getThumbnailUrl() );
        video.trailerUrl( dto.getTrailerUrl() );
        video.duration( dto.getDuration() );
        video.releaseYear( dto.getReleaseYear() );
        video.type( dto.getType() );
        video.categoryId( dto.getCategoryId() );
        video.rating( dto.getRating() );
        video.director( dto.getDirector() );
        List<String> list = dto.getCastMembers();
        if ( list != null ) {
            video.castMembers( new ArrayList<String>( list ) );
        }

        return video.build();
    }
}
