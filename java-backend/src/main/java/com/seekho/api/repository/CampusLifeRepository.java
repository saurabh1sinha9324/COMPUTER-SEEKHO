package com.seekho.api.repository;

import com.seekho.api.entity.CampusLife;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampusLifeRepository extends JpaRepository<CampusLife, Long> {
}


