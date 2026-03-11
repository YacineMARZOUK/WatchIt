package com.streamvid.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "histories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String userId;
    private String videoId;
    private String watchedAt;
    private Integer progressTime;
    private Boolean completed;
}
