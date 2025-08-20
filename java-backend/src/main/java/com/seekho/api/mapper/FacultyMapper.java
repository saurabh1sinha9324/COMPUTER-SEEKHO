package com.seekho.api.mapper;

import com.seekho.api.dto.FacultyDTO;
import com.seekho.api.entity.Faculty;

public class
FacultyMapper {

    public static FacultyDTO toDTO(Faculty faculty) {
        FacultyDTO dto = new FacultyDTO();
        dto.setId(faculty.getId());
        dto.setName(faculty.getName());
        dto.setSubject(faculty.getSubject());
        dto.setEmail(faculty.getEmail());
        dto.setPhotoUrl(faculty.getPhotoUrl());
        dto.setActive(faculty.isActive()); // ✅ map active
        return dto;
    }

    public static Faculty toEntity(FacultyDTO dto) {
        Faculty faculty = new Faculty();
        faculty.setId(dto.getId());
        faculty.setName(dto.getName());
        faculty.setSubject(dto.getSubject());
        faculty.setEmail(dto.getEmail());
        faculty.setPhotoUrl(dto.getPhotoUrl());
        faculty.setActive(dto.isActive()); // ✅ use actual checkbox value
        return faculty;
    }
}
