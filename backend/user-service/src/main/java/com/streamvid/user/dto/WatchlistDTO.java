package com.streamvid.user.dto;

import lombok.Data;

@Data
public class WatchlistDTO {
    private String id;
    private String userId;
    private String videoId;
    private String addedAt;
}
