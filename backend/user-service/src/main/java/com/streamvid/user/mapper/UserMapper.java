package com.streamvid.user.mapper;

import com.streamvid.user.dto.UserDTO;
import com.streamvid.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User user);
    User toEntity(UserDTO dto);
}
