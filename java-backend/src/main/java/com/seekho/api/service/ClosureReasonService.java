package com.seekho.api.service;



import com.seekho.api.entity.ClosureReason;

import java.util.List;
import java.util.Optional;

public interface ClosureReasonService {
	Optional<ClosureReason> getClosureReasonById(int closureReasonId);
	List<ClosureReason> getAllClosureReasons();
	ClosureReason addClosureReason(ClosureReason closureReason);
	boolean updateClosureReason(ClosureReason closureReason);
	void deleteClosureReason(int closureReasonId);	
}
