package com.seekho.api.controller;

import com.seekho.api.entity.Enquiry;
import com.seekho.api.entity.Student;
import com.seekho.api.repository.EnquiryRepo;
import com.seekho.api.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return new ResponseEntity<>(studentService.getAllStudents(), HttpStatus.OK);
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable int studentId) {
        Optional<Student> student = studentService.getStudentById(studentId);
        return student.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

//    @PostMapping
//    public ResponseEntity<String> addStudent(@RequestBody Student student) {
//        studentService.addStudent(student);
//        return ResponseEntity.status(HttpStatus.CREATED).body("Student added successfully");
//    }
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private EnquiryRepo enquiryRepository;

    @PostMapping
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        studentService.addStudent(student);  // saves student

        // Safely fetch Enquiry
        int enquiryId = student.getEnquiry().getEnquiryId();
        Enquiry enquiry = enquiryRepository.findById(enquiryId).orElse(null);

        if (enquiry != null && enquiry.getEnquirerEmailId() != null) {
            Map<String, String> emailRequest = new HashMap<>();
            emailRequest.put("to", enquiry.getEnquirerEmailId());
            emailRequest.put("studentName", enquiry.getEnquirerName());

            try {
                restTemplate.postForObject("http://localhost:8081/api/mail/send", emailRequest, String.class);
            } catch (Exception e) {
                System.out.println("Mail service failed: " + e.getMessage());
            }
        } else {
            System.out.println("Enquiry or email was null, skipping mail.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("Student added and email sent (if possible)");
    }



    @PutMapping
    public ResponseEntity<String> updateStudent(@RequestBody Student student) {
        boolean isUpdated = studentService.updateStudent(student);
        if (isUpdated) {
            return ResponseEntity.ok("Student updated");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<String> deleteStudent(@PathVariable int studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok("Student deleted");
    }
}
