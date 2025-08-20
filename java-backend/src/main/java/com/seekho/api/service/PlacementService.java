package com.seekho.api.service;

import com.seekho.api.entity.Placement;
import java.util.List;
import java.util.Optional;

public interface PlacementService {
    Placement addPlacement(Placement placement);
    Optional<Placement> getPlacementById(int placementId);
    List<Placement> getAllPlacements();
    List<Placement> getPlacementsByBatchId(int batchId);
    void deletePlacement(int placementId);
    Placement updatePlacement(int placementId, Placement updatedPlacement);
}
