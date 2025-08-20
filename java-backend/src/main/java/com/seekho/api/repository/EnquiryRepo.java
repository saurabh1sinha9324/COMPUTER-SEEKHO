package com.seekho.api.repository;


import com.seekho.api.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
@Transactional
public interface EnquiryRepo extends JpaRepository<com.seekho.api.entity.Enquiry, Integer> {
	List<Enquiry> findByEnquiryDate(LocalDate enquiryDate);


@Query(value = """
        SELECT * FROM enquiry 
        WHERE staff_id = :staffId 
          AND enquiry_is_active = true 
        ORDER BY follow_up_date DESC
        """, nativeQuery = true)
List<Enquiry> getByStaffId(Long staffId);


	@Modifying
	@Query(value = """
			UPDATE Enquiry SET Enquiry.enquiry_is_active = false WHERE enquiry_id = ?1;
			""", nativeQuery = true)
	void deactivateEnquiry(int enquiryId);

}
