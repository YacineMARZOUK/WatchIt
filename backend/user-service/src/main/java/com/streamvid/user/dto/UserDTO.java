package com.streamvid.user.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String username;
    private String email;
    // Do not return password in DTO
}
