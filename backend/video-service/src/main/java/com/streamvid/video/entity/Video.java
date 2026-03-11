package com.streamvid.video.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "videos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String title;
    @Column(length = 2000)
    private String description;
    private String thumbnailUrl;
    private String trailerUrl;
    private String duration;
    private Integer releaseYear;
    
    private String type; 
    private String categoryId;
    private Double rating;
    private String director;
    
    @ElementCollection
    private List<String> castMembers;
}
