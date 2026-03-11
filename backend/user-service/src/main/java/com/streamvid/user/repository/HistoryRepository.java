package com.streamvid.user.repository;

import com.streamvid.user.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HistoryRepository extends JpaRepository<History, String> {
    List<History> findByUserId(String userId);
    Optional<History> findByUserIdAndVideoId(String userId, String videoId);
}
