package com.streamvid.user.repository;

import com.streamvid.user.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, String> {
    List<Watchlist> findByUserId(String userId);
    void deleteByUserIdAndVideoId(String userId, String videoId);
}
