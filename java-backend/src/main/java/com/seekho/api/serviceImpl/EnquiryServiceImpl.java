package com.seekho.api.serviceImpl;


import com.seekho.api.entity.ClosureReason;
import com.seekho.api.entity.Enquiry;
import com.seekho.api.repository.EnquiryRepo;
import com.seekho.api.service.ClosureReasonService;
import com.seekho.api.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EnquiryServiceImpl implements EnquiryService {

	@Autowired
	private EnquiryRepo enquiryRepo;
	@Autowired
	private ClosureReasonService closureReasonService;

	@Override
	public Optional<com.seekho.api.entity.Enquiry> getEnquiryById(int enquiryId) {
		return enquiryRepo.findById(enquiryId);
	}

	@Override
	public List<Enquiry> getAllEnquiries() {
		return enquiryRepo.findAll();
	}

	@Override
	public Enquiry addEnquiry(Enquiry enquiry) {
		return enquiryRepo.save(enquiry);
	}

	@Override
	public boolean updateEnquiry(Enquiry updatedEnquiry) {
		return enquiryRepo.findById(updatedEnquiry.getEnquiryId())
				.map(existing -> {
					existing.setEnquirerName(updatedEnquiry.getEnquirerName());
					existing.setEnquirerAddress(updatedEnquiry.getEnquirerAddress());
					existing.setEnquirerMobile(updatedEnquiry.getEnquirerMobile());
					existing.setEnquirerEmailId(updatedEnquiry.getEnquirerEmailId());
					existing.setEnquiryDate(updatedEnquiry.getEnquiryDate());
					existing.setEnquirerQuery(updatedEnquiry.getEnquirerQuery());
					existing.setCourseName(updatedEnquiry.getCourseName()); // keep if provided
					existing.setStaffId(updatedEnquiry.getStaff()); // keep if provided
					existing.setStudentName(updatedEnquiry.getStudentName());
					existing.setEnquiryCounter(updatedEnquiry.getEnquiryCounter());
					existing.setFollowUpDate(updatedEnquiry.getFollowUpDate());
					existing.setEnquiryIsActive(updatedEnquiry.getEnquiryIsActive());
					enquiryRepo.save(existing);
					return true;
				})
				.orElse(false);
	}


	@Override
	public void deleteEnquiry(int enquiryId) {
		enquiryRepo.deleteById(enquiryId);
	}

	@Override
	public List<Enquiry> getEnquiryByDate(LocalDate enquiryDate) {
		return enquiryRepo.findByEnquiryDate(enquiryDate);
	}


	@Override
	public List<Enquiry> getByStaffId(Long staffId) {
		return enquiryRepo.getByStaffId(staffId);
	}


	@Override
	public void deactivateEnquiry(String closureReasonDesc, int enquiryId){
		closureReasonService.addClosureReason(new ClosureReason(enquiryRepo.findById(enquiryId).get().getEnquirerName(), closureReasonDesc));
		enquiryRepo.deactivateEnquiry(enquiryId);
	}
	
}
