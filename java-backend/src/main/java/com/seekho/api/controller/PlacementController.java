package com.seekho.api.controller;

import com.seekho.api.entity.Placement;
import com.seekho.api.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/placement")
public class PlacementController {

    @Autowired
    private PlacementService placementService;

    @GetMapping("/byId/{id}")
    public ResponseEntity<Placement> getPlacement(@PathVariable int id) {
        return placementService.getPlacementById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<Placement>> getAllPlacements() {
        List<Placement> placements = placementService.getAllPlacements();
        return placements.isEmpty()
                ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
                : ResponseEntity.ok(placements);
    }

    @PostMapping
    public ResponseEntity<String> addPlacement(@RequestBody Placement placement) {
        placementService.addPlacement(placement);
        return ResponseEntity.status(HttpStatus.CREATED).body("Placement Details Added");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlacement(@PathVariable int id, @RequestBody Placement updatedPlacement) {
        try {
            Placement placement = placementService.updatePlacement(id, updatedPlacement);
            return ResponseEntity.ok(placement);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlacement(@PathVariable int id) {
        Optional<Placement> placement = placementService.getPlacementById(id);
        if (placement.isPresent()) {
            placementService.deletePlacement(id);
            return ResponseEntity.ok("Placement Deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Placement Not Found");
    }

    @GetMapping("/byBatchId/{batchId}")
    public ResponseEntity<List<Placement>> getPlacementsByBatch(@PathVariable int batchId) {
        List<Placement> placements = placementService.getPlacementsByBatchId(batchId);
        return placements.isEmpty()
                ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
                : ResponseEntity.ok(placements);
    }
}
