package com.seekho.api.controller;

import com.seekho.api.entity.ClosureReason;
import com.seekho.api.service.ClosureReasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/closureReason")
public class ClosureReasonController {

	@Autowired
	private ClosureReasonService closureReasonService;

	@GetMapping("/{closureReasonId}")
	public ResponseEntity<ClosureReason> getClosureReasonById(@PathVariable int closureReasonId) {
		Optional<ClosureReason> closureReason = closureReasonService.getClosureReasonById(closureReasonId);
		return closureReason.map(reason -> new ResponseEntity<>(reason, HttpStatus.OK))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping
	public ResponseEntity<List<ClosureReason>> getAllClosureReasons() {
		return new ResponseEntity<>(closureReasonService.getAllClosureReasons(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<String> addClosureReason(@RequestBody ClosureReason closureReason) {
		closureReasonService.addClosureReason(closureReason);
		return ResponseEntity.status(HttpStatus.CREATED).body("ClosureReason Added");
	}

	@PutMapping
	public ResponseEntity<String> updateClosureReason(@RequestBody ClosureReason closureReason) {
		boolean isUpdated = closureReasonService.updateClosureReason(closureReason);
		if (isUpdated) {
			return ResponseEntity.ok("ClosureReason Details Updated");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ClosureReason Not Found");
		}
	}

	@DeleteMapping("/{closureReasonId}")
	public ResponseEntity<String> deleteClosureReason(@PathVariable int closureReasonId) {
		closureReasonService.deleteClosureReason(closureReasonId);
		return ResponseEntity.ok("ClosureReason Deleted");
	}
}
