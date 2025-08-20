package com.seekho.api.serviceImpl;


import com.seekho.api.entity.Course;
import com.seekho.api.repository.CourseRepo;
import com.seekho.api.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

	@Autowired
    CourseRepo courseRepo;
	
    @Override
    public Optional<Course> getCourseById(int courseId) {
        return courseRepo.findById(courseId);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    @Override
    public Course addCourse(Course course) {
        return courseRepo.save(course);
    }

    @Override
    public boolean updateCourse(Course course) {
        if (courseRepo.existsById(course.getCourseId())) {
            courseRepo.save(course);
            return true;
        }
        return false;
    }

    @Override
    public void deleteCourse(int courseId) {
        courseRepo.deleteById(courseId);
    }
    
    @Override
    public Optional<Course> findByCourseName(String courseName) {
        return courseRepo.findCourseByName(courseName);
    }
    
}
