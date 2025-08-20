package com.seekho.api.serviceImpl;

import com.seekho.api.entity.Course;
import com.seekho.api.entity.Student;
import com.seekho.api.repository.CourseRepo;
import com.seekho.api.repository.StudentRepo;
import com.seekho.api.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Override
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @Override
    public Optional<Student> getStudentById(int studentId) {
        return studentRepo.findById(studentId);
    }

    @Autowired
    private CourseRepo courseRepo;

    @Override
    public Student addStudent(Student student) {
        if (student.getCourse() != null && student.getCourse().getCourseId() > 0) {
            Course course = courseRepo.findById(student.getCourse().getCourseId()).orElse(null);
            if (course != null) {
                student.setCourse(course);
                student.setPaymentDue(course.getCourseFee());
            }
        }
        return studentRepo.save(student);
    }


    @Override
    public boolean updateStudent(Student student) {
        if (studentRepo.existsById(student.getStudentId())) {
            studentRepo.save(student);
            return true;
        }
        return false;
    }

    @Override
    public void deleteStudent(int studentId) {
        studentRepo.deleteById(studentId);
    }
}
