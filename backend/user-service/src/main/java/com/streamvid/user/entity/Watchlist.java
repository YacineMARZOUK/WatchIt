package com.streamvid.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "watchlists")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Watchlist {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String userId;
    private String videoId;
    private String addedAt;
}
