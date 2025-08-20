//package com.seekho.api.service;
//import com.seekho.api.dto.LoginDto;
//import com.seekho.api.dto.StaffResponseDto;
//import com.seekho.api.entity.Staff;
//import com.seekho.api.repository.StaffRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.List;

//version1
//@Service
//public class StaffService {
//
//    @Autowired
//    private StaffRepo userRepository;
//
//    public Boolean loginUser(LoginDto loginDto) {
//        Staff user = userRepository.findByStaffUsername(loginDto.getStaff_username());
//        if (user == null) {
//            return false;
//        }
//
//        return user.getStaffPassword().equals(loginDto.getStaff_password());
//    }
//
//    public Staff addUser(Staff user) {
//        return userRepository.save(user);
//    }
//}

//version2
//@Service
//public class StaffService {
//
//    @Autowired
//    private StaffRepo userRepository;
//
//    public StaffResponseDto loginUser(LoginDto loginDto) {
//        Staff user = userRepository.findByStaffUsername(loginDto.getStaff_username());
//        if (user != null && user.getStaffPassword().equals(loginDto.getStaff_password())) {
//            return new StaffResponseDto(
//                    user.getStaffId(),
//                    user.getStaffName(),
//                    user.getPhotoUrl(),
//                    user.getStaffMobile(),
//                    user.getStaffEmail(),
//                    user.getStaffRole()
//            );
//        }
//        return null;
//    }
//
//    public Staff addUser(Staff user) {
//        return userRepository.save(user);
//    }
//
//    public Staff updateUser(Long id, Staff updatedUser) {
//        return userRepository.findById(id)
//                .map(existing -> {
//                    existing.setStaffName(updatedUser.getStaffName());
//                    existing.setPhotoUrl(updatedUser.getPhotoUrl());
//                    existing.setStaffMobile(updatedUser.getStaffMobile());
//                    existing.setStaffEmail(updatedUser.getStaffEmail());
//                    existing.setStaffUsername(updatedUser.getStaffUsername());
//                    existing.setStaffPassword(updatedUser.getStaffPassword());
//                    existing.setStaffRole(updatedUser.getStaffRole());
//                    return userRepository.save(existing);
//                })
//                .orElse(null);
//    }
//
//    public boolean deleteUser(Long id) {
//        if (userRepository.existsById(id)) {
//            userRepository.deleteById(id);
//            return true;
//        }
//        return false;
//    }
//
//    public List<Staff> getAllStaff() {
//        return userRepository.findAll();
//    }
//}


package com.seekho.api.service;

import com.seekho.api.dto.LoginDto;
import com.seekho.api.dto.StaffResponseDto;
import com.seekho.api.entity.Staff;
import com.seekho.api.repository.StaffRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public StaffResponseDto loginUser(LoginDto loginDto) {
        Staff user = userRepository.findByStaffUsername(loginDto.getStaff_username());
        if (user != null && passwordEncoder.matches(loginDto.getStaff_password(), user.getStaffPassword())) {
            return new StaffResponseDto(
                    user.getStaffId(),
                    user.getStaffName(),
                    user.getPhotoUrl(),
                    user.getStaffMobile(),
                    user.getStaffEmail(),
                    user.getStaffRole()
            );
        }
        return null;
    }

    public Staff addUser(Staff user) {
        // Hash before saving
        user.setStaffPassword(passwordEncoder.encode(user.getStaffPassword()));
        return userRepository.save(user);
    }

    public Staff updateUser(Long id, Staff updatedUser) {
        return userRepository.findById(id)
                .map(existing -> {
                    existing.setStaffName(updatedUser.getStaffName());
                    existing.setPhotoUrl(updatedUser.getPhotoUrl());
                    existing.setStaffMobile(updatedUser.getStaffMobile());
                    existing.setStaffEmail(updatedUser.getStaffEmail());
                    existing.setStaffUsername(updatedUser.getStaffUsername());

                    // Only hash if a new password is provided
                    if (updatedUser.getStaffPassword() != null && !updatedUser.getStaffPassword().isBlank()) {
                        existing.setStaffPassword(passwordEncoder.encode(updatedUser.getStaffPassword()));
                    }

                    existing.setStaffRole(updatedUser.getStaffRole());
                    return userRepository.save(existing);
                })
                .orElse(null);
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Staff> getAllStaff() {
        return userRepository.findAll();
    }
}
