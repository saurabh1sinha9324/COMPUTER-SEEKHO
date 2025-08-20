package com.seekho.api.service;


import com.seekho.api.entity.Batch;

import java.util.List;
import java.util.Optional;

public interface BatchService {
	Optional<com.seekho.api.entity.Batch> getBatchById(int batchId);
	List<Batch> getAllBatches();
	Batch addBatch(Batch batch);
	void deleteBatch(int batchId);
	boolean updateBatch(Batch batch);
	Optional<Batch> findByBatchName(String batchName);
	void activateBatch(Boolean batchIsActive, int batchId);
}
