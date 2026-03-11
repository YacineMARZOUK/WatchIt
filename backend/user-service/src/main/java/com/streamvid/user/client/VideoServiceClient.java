package com.streamvid.user.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "video-service", url = "http://localhost:8081/api/videos")
public interface VideoServiceClient {
    @GetMapping("/{id}/exists")
    boolean checkVideoExists(@PathVariable("id") String id);
}
