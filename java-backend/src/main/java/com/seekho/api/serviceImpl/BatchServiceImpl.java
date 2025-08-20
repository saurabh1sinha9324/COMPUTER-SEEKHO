package com.seekho.api.serviceImpl;


import com.seekho.api.entity.Batch;
import com.seekho.api.repository.BatchRepo;
import com.seekho.api.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatchServiceImpl implements BatchService {

	@Autowired
	private BatchRepo batchRepo;
	
	@Override
	public Optional<Batch> getBatchById(int batchId) {
		return batchRepo.findById(batchId);
	}

	@Override
	public List<Batch> getAllBatches() {
		return batchRepo.findAll();
	}

	@Override
	public Batch addBatch(Batch batch) {
		return batchRepo.save(batch);
	}

	@Override
	public boolean updateBatch(Batch batch) {
		Optional<Batch> foundBatch = batchRepo.findById(batch.getBatchId());
		if(foundBatch.isPresent()) {
			batchRepo.save(batch);
			return true;
		}
		else return false;
	}

	@Override
	public void deleteBatch(int batchId) {
		batchRepo.deleteById(batchId);
	}

	@Override
	public Optional<Batch> findByBatchName(String batchName) {
		return batchRepo.findByBatchName(batchName);
	}

	@Override
	public void activateBatch(Boolean batchIsActive, int batchId) {
		batchRepo.activateBatch(batchIsActive, batchId);
	}

}
