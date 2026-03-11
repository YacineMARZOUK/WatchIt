package com.streamvid.user.mapper;

import com.streamvid.user.dto.HistoryDTO;
import com.streamvid.user.entity.History;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HistoryMapper {
    HistoryDTO toDto(History history);
    History toEntity(HistoryDTO dto);
}
