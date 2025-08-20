package com.seekho.api.serviceImpl;


import com.seekho.api.entity.ClosureReason;
import com.seekho.api.repository.ClosureReasonRepo;
import com.seekho.api.service.ClosureReasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClosureReasonServiceImpl implements ClosureReasonService {

	@Autowired
	private ClosureReasonRepo closureReasonRepository;
	
	@Override
	public Optional<ClosureReason> getClosureReasonById(int closureReasonId){
		return closureReasonRepository.findById(closureReasonId);
	}
	
	@Override
	public List<ClosureReason> getAllClosureReasons(){
		return closureReasonRepository.findAll();
	}
	
	@Override
	public ClosureReason addClosureReason(ClosureReason closureReason) {
		return closureReasonRepository.save(closureReason);
	}	
	
	@Override
	public boolean updateClosureReason(ClosureReason closureReason) {
		Optional<ClosureReason> foundClosureReason = closureReasonRepository.findById(closureReason.getClosureReasonId());
		if(foundClosureReason.isPresent()) {
			closureReasonRepository.save(closureReason);
			return true;
		}
		else return false;
	}
	
	@Override
	public void deleteClosureReason(int closureReasonId) {
		closureReasonRepository.deleteById(closureReasonId);
	}
}
