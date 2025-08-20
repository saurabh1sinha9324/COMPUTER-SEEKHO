package com.seekho.api.service;



import com.seekho.api.entity.Enquiry;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EnquiryService {
	Optional<Enquiry> getEnquiryById(int enquiryId);
    List<Enquiry> getAllEnquiries();
    Enquiry addEnquiry(Enquiry enquiry);
    boolean updateEnquiry(Enquiry enquiry);
    void deleteEnquiry(int enquiryId);
	List<Enquiry> getEnquiryByDate(LocalDate enquiryDate);

    List<Enquiry> getByStaffId(Long staffId);

    void deactivateEnquiry(String closureReasonDesc, int enquiryId);
}
