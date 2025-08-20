package com.seekho.api.repository;


import com.seekho.api.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepo extends JpaRepository<Announcement,Integer> {
}