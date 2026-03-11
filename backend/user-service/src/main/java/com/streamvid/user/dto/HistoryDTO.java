package com.streamvid.user.dto;

import lombok.Data;

@Data
public class HistoryDTO {
    private String id;
    private String userId;
    private String videoId;
    private String watchedAt;
    private Integer progressTime;
    private Boolean completed;
}
