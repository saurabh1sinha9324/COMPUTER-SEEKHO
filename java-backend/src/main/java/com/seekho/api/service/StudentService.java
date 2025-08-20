package com.seekho.api.service;

import com.seekho.api.entity.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<Student> getAllStudents();
    Optional<Student> getStudentById(int studentId);
    Student addStudent(Student student);
    boolean updateStudent(Student student);
    void deleteStudent(int studentId);
}
