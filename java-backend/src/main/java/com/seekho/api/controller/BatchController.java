package com.seekho.api.controller;

import com.seekho.api.entity.Batch;
import com.seekho.api.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/batch")
public class BatchController {

	@Autowired
	private BatchService batchService;

	@GetMapping("/byId/{batchId}")
	public ResponseEntity<Batch> getBatchById(@PathVariable int batchId){
		Optional<Batch> foundBatch = batchService.getBatchById(batchId);
		return foundBatch.map(batch -> new ResponseEntity<>(batch, HttpStatus.OK))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping
	public List<Batch> getAllBatches(){
		return batchService.getAllBatches();
	}

	@PostMapping
	public ResponseEntity<String> addBatch(@RequestBody Batch batch){
		batchService.addBatch(batch);
		return ResponseEntity.status(HttpStatus.CREATED).body("Batch Added");
	}

	@PutMapping
	public ResponseEntity<String> updateBatch(@RequestBody Batch batch){
		boolean isUpdated = batchService.updateBatch(batch);
		if (isUpdated)
			return new ResponseEntity<>("Batch Details Updated", HttpStatus.OK);
		else
			return new ResponseEntity<>("Batch Not Found", HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{batchId}")
	public ResponseEntity<String> deleteBatch(@PathVariable int batchId){
		batchService.deleteBatch(batchId);
		return ResponseEntity.ok("Batch Deleted");
	}

	@GetMapping("/byName/{batchName}")
	public ResponseEntity<Batch> findByBatchName(@PathVariable String batchName){
		Optional<Batch> foundBatch = batchService.findByBatchName(batchName);
		return foundBatch.map(batch -> new ResponseEntity<>(batch, HttpStatus.OK))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/activate/{batchIsActive}/{batchId}")
	public ResponseEntity<String> activateBatch(@PathVariable boolean batchIsActive, @PathVariable int batchId){
		batchService.activateBatch(batchIsActive, batchId);
		return ResponseEntity.ok("Activation Toggled");
	}
}
