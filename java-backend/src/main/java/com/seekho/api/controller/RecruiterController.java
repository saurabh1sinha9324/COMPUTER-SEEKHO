package com.seekho.api.controller;

import com.seekho.api.entity.Recruiter;
import com.seekho.api.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {

    @Autowired
    private RecruiterService recruiterService;

    @GetMapping
    public ResponseEntity<List<Recruiter>> getAllRecruiters() {
        List<Recruiter> recruiters = recruiterService.getAllRecruiters();
        if (recruiters.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(recruiters);
    }

    @GetMapping("/byId/{recruiterId}")
    public ResponseEntity<Recruiter> getRecruiterById(@PathVariable int recruiterId) {
        Optional<Recruiter> recruiter = recruiterService.getRecruiterById(recruiterId);
        return recruiter.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> addRecruiter(@RequestBody Recruiter recruiter) {
        recruiterService.addRecruiter(recruiter);
        return ResponseEntity.status(HttpStatus.CREATED).body("Recruiter Added");
    }

    @PutMapping
    public ResponseEntity<String> updateRecruiter(@RequestBody Recruiter recruiter) {
        boolean isUpdated = recruiterService.updateRecruiter(recruiter);
        if (isUpdated) {
            return ResponseEntity.ok("Recruiter Details Updated");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recruiter Not Found");
        }
    }

    @DeleteMapping("/{recruiterId}")
    public ResponseEntity<String> deleteRecruiter(@PathVariable int recruiterId) {
        recruiterService.deleteRecruiter(recruiterId);
        return ResponseEntity.ok("Recruiter Deleted");
    }
}
