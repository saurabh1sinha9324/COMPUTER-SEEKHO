package com.seekho.api.repository;

import com.seekho.api.entity.Placement;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface PlacementRepo extends JpaRepository<Placement, Integer> {

       @Query("SELECT p FROM Placement p ORDER BY p.batch.batchId")
       List<Placement> fetchPlacedStudents();

       @Query("SELECT p FROM Placement p WHERE p.batch.batchId = :batchId ORDER BY p.batch.batchId")
       List<Placement> findByBatchId(@Param("batchId") int batchId);

       List<Placement> findByBatchBatchId(int batchId);
}
