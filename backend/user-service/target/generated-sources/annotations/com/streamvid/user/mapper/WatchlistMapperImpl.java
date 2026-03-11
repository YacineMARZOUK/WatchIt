package com.streamvid.user.mapper;

import com.streamvid.user.dto.WatchlistDTO;
import com.streamvid.user.entity.Watchlist;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-10T15:22:34+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Eclipse Adoptium)"
)
@Component
public class WatchlistMapperImpl implements WatchlistMapper {

    @Override
    public WatchlistDTO toDto(Watchlist watchlist) {
        if ( watchlist == null ) {
            return null;
        }

        WatchlistDTO watchlistDTO = new WatchlistDTO();

        watchlistDTO.setId( watchlist.getId() );
        watchlistDTO.setUserId( watchlist.getUserId() );
        watchlistDTO.setVideoId( watchlist.getVideoId() );
        watchlistDTO.setAddedAt( watchlist.getAddedAt() );

        return watchlistDTO;
    }

    @Override
    public Watchlist toEntity(WatchlistDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Watchlist.WatchlistBuilder watchlist = Watchlist.builder();

        watchlist.id( dto.getId() );
        watchlist.userId( dto.getUserId() );
        watchlist.videoId( dto.getVideoId() );
        watchlist.addedAt( dto.getAddedAt() );

        return watchlist.build();
    }
}
