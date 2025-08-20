package com.seekho.api.controller;



import com.seekho.api.dto.LoginDto;
import com.seekho.api.dto.StaffResponseDto;
import com.seekho.api.entity.Staff;
import com.seekho.api.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:5173")
//public class StaffController {
//
//    @Autowired
//    private StaffService staffService;
//
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
//        boolean isValid = staffService.loginUser(loginDto);
//        if (isValid) {
//            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }
//}



@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        StaffResponseDto userDto = staffService.loginUser(loginDto);
        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping
    public ResponseEntity<Staff> addStaff(@RequestBody Staff staff) {
        return ResponseEntity.status(HttpStatus.CREATED).body(staffService.addUser(staff));
    }






    @PutMapping("/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id, @RequestBody Staff staff) {
        Staff updated = staffService.updateUser(id, staff);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Staff not found");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStaff(@PathVariable Long id) {
        if (staffService.deleteUser(id)) {
            return ResponseEntity.ok("Staff deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Staff not found");
    }

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }
}
