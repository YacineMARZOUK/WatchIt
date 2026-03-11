package com.streamvid.user.mapper;

import com.streamvid.user.dto.HistoryDTO;
import com.streamvid.user.entity.History;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-10T15:22:34+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Eclipse Adoptium)"
)
@Component
public class HistoryMapperImpl implements HistoryMapper {

    @Override
    public HistoryDTO toDto(History history) {
        if ( history == null ) {
            return null;
        }

        HistoryDTO historyDTO = new HistoryDTO();

        historyDTO.setId( history.getId() );
        historyDTO.setUserId( history.getUserId() );
        historyDTO.setVideoId( history.getVideoId() );
        historyDTO.setWatchedAt( history.getWatchedAt() );
        historyDTO.setProgressTime( history.getProgressTime() );
        historyDTO.setCompleted( history.getCompleted() );

        return historyDTO;
    }

    @Override
    public History toEntity(HistoryDTO dto) {
        if ( dto == null ) {
            return null;
        }

        History.HistoryBuilder history = History.builder();

        history.id( dto.getId() );
        history.userId( dto.getUserId() );
        history.videoId( dto.getVideoId() );
        history.watchedAt( dto.getWatchedAt() );
        history.progressTime( dto.getProgressTime() );
        history.completed( dto.getCompleted() );

        return history.build();
    }
}
