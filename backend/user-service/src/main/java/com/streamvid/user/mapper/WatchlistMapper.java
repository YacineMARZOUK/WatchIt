package com.streamvid.user.mapper;

import com.streamvid.user.dto.WatchlistDTO;
import com.streamvid.user.entity.Watchlist;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WatchlistMapper {
    WatchlistDTO toDto(Watchlist watchlist);
    Watchlist toEntity(WatchlistDTO dto);
}
