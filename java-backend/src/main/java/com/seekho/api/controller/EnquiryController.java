package com.seekho.api.controller;

import com.seekho.api.entity.Enquiry;
import com.seekho.api.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/enquiry")
public class EnquiryController {

	@Autowired
	private EnquiryService enquiryService;

	@GetMapping("/{enquiryId}")
	public ResponseEntity<Enquiry> getEnquiryById(@PathVariable int enquiryId) {
		Optional<Enquiry> enquiry = enquiryService.getEnquiryById(enquiryId);
		return enquiry.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping
	public ResponseEntity<List<Enquiry>> getAllEnquiries() {
		return new ResponseEntity<>(enquiryService.getAllEnquiries(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<String> addEnquiry(@RequestBody Enquiry enquiry) {
		enquiryService.addEnquiry(enquiry);
		return ResponseEntity.status(HttpStatus.CREATED).body("Enquiry Added");
	}

	@PutMapping
	public ResponseEntity<String> updateEnquiry(@RequestBody Enquiry enquiry) {
		boolean isUpdated = enquiryService.updateEnquiry(enquiry);
		if (isUpdated) {
			return ResponseEntity.ok("Enquiry Updated");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("There was a problem updating the Enquiry");
		}
	}

	@DeleteMapping("/{enquiryId}")
	public ResponseEntity<String> deleteEnquiry(@PathVariable int enquiryId) {
		enquiryService.deleteEnquiry(enquiryId);
		return ResponseEntity.ok("Enquiry Deleted");
	}



	@GetMapping("/getByStaffId/{staffId}")
	public ResponseEntity<List<Enquiry>> getByStaff(@PathVariable Long staffId) {
		List<Enquiry> enquiries = enquiryService.getByStaffId(staffId);
		if (enquiries.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return new ResponseEntity<>(enquiries, HttpStatus.OK);
		}
	}


	@PutMapping("/deactivate/{enquiryId}")
	public ResponseEntity<String> deactivateEnquiry(@RequestBody String closureReasonDesc, @PathVariable int enquiryId) {
		enquiryService.deactivateEnquiry(closureReasonDesc, enquiryId);
		return ResponseEntity.ok("Enquiry Closed");
	}
}
