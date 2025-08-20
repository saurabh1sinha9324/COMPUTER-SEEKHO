package com.seekho.api.serviceImpl;

import com.seekho.api.entity.Placement;
import com.seekho.api.repository.PlacementRepo;
import com.seekho.api.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlacementServiceImpl implements PlacementService {

    @Autowired
    private PlacementRepo placementRepo;

    @Override
    public Placement addPlacement(Placement placement) {
        return placementRepo.save(placement);
    }

    @Override
    public Optional<Placement> getPlacementById(int placementId) {
        return placementRepo.findById(placementId);
    }

    @Override
    public List<Placement> getAllPlacements() {
        return placementRepo.findAll();
    }

    @Override
    public List<Placement> getPlacementsByBatchId(int batchId) {
        return placementRepo.findByBatchBatchId(batchId); // updated method name
    }

    @Override
    public void deletePlacement(int placementId) {
        placementRepo.deleteById(placementId);
    }

    @Override
    public Placement updatePlacement(int placementId, Placement updatedPlacement) {
        return placementRepo.findById(placementId)
                .map(existing -> {
                    existing.setBatch(updatedPlacement.getBatch());
                    existing.setStudentId(updatedPlacement.getStudentId());
                    existing.setStudentName(updatedPlacement.getStudentName());
                    existing.setStudentPhoto(updatedPlacement.getStudentPhoto());
                    existing.setRecruiter(updatedPlacement.getRecruiter());
                    return placementRepo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Placement not found with ID: " + placementId));
    }
}
