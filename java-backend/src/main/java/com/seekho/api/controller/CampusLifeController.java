package com.seekho.api.controller;

import com.seekho.api.dto.CampusLifeDto;
import com.seekho.api.service.CampusLifeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/campus-life")
public class CampusLifeController {

    @Autowired
    private CampusLifeService campusLifeService;

    // Create
    @PostMapping
    public ResponseEntity<CampusLifeDto> createCampusLife(@RequestBody CampusLifeDto campusLifeDto) {
        CampusLifeDto savedDto = campusLifeService.createCampusLife(campusLifeDto);
        return ResponseEntity.ok(savedDto);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<CampusLifeDto>> getAllCampusLife() {
        List<CampusLifeDto> campusLifeList = campusLifeService.getAllCampusLife();
        return ResponseEntity.ok(campusLifeList);
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<CampusLifeDto> getCampusLifeById(@PathVariable Long id) {
        CampusLifeDto campusLifeDto = campusLifeService.getCampusLifeById(id);
        return ResponseEntity.ok(campusLifeDto);
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<CampusLifeDto> updateCampusLife(
            @PathVariable Long id,
            @RequestBody CampusLifeDto campusLifeDto
    ) {
        CampusLifeDto updatedDto = campusLifeService.updateCampusLife(id, campusLifeDto);
        return ResponseEntity.ok(updatedDto);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCampusLife(@PathVariable Long id) {
        campusLifeService.deleteCampusLife(id);
        return ResponseEntity.ok("CampusLife with ID " + id + " deleted successfully");
    }
}
