package com.streamvid.video.dto;

import lombok.Data;
import java.util.List;

@Data
public class VideoDTO {
    private String id;
    private String title;
    private String description;
    private String thumbnailUrl;
    private String trailerUrl;
    private String duration;
    private Integer releaseYear;
    private String type;
    private String categoryId;
    private Double rating;
    private String director;
    private List<String> castMembers;
}
