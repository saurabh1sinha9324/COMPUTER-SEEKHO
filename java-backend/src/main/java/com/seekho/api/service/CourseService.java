package com.seekho.api.service;



import com.seekho.api.entity.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    Optional<Course> getCourseById(int courseId);
    List<Course> getAllCourses();
    Course addCourse(Course course);
    boolean updateCourse(Course course);
    void deleteCourse(int courseId);
    Optional<Course> findByCourseName(String courseName);
}
