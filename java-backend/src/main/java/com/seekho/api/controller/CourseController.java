package com.seekho.api.controller;

import com.seekho.api.entity.Course;
import com.seekho.api.service.CourseService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/course")
public class CourseController {

    private static final Logger logger = LogManager.getLogger(CourseController.class);

    @Autowired
    private CourseService courseService;

    @GetMapping("/byId/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        logger.info("Fetching course with ID: {}", id);
        Optional<Course> course = courseService.getCourseById(id);
        if (course.isPresent()) {
            logger.info("Course found: {}", course.get().getCourseName());
            return ResponseEntity.status(HttpStatus.OK).body(course.get());
        } else {
            logger.warn("Course not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public List<Course> getAllCourses() {
        logger.info("Fetching all courses");
        List<Course> courses = courseService.getAllCourses();
        logger.info("Total courses found: {}", courses.size());
        return courses;
    }

    @PostMapping
    public ResponseEntity<String> addCourse(@RequestBody Course course) {
        logger.info("Adding new course: {}", course.getCourseName());
        try {
            courseService.addCourse(course);
            logger.info("Course added successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body("Course Added");
        } catch (Exception e) {
            logger.error("Error adding course: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add course");
        }
    }

    @PutMapping
    public ResponseEntity<String> updateCourse(@RequestBody Course course) {
        logger.info("Updating course with ID: {}", course.getCourseId());
        boolean isUpdated = courseService.updateCourse(course);
        if (isUpdated) {
            logger.info("Course updated successfully: {}", course.getCourseName());
            return new ResponseEntity<>("Course Details Updated", HttpStatus.OK);
        } else {
            logger.warn("Course not found for update: ID {}", course.getCourseId());
            return new ResponseEntity<>("Course Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<String> deleteCourse(@PathVariable int courseId) {
        logger.info("Deleting course with ID: {}", courseId);
        try {
            courseService.deleteCourse(courseId);
            logger.info("Course deleted successfully: ID {}", courseId);
            return ResponseEntity.ok("Course Deleted");
        } catch (Exception e) {
            logger.error("Error deleting course with ID {}: {}", courseId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete course");
        }
    }

    @GetMapping("/byName/{courseName}")
    public ResponseEntity<Course> getCourseByName(@PathVariable String courseName) {
        logger.info("Searching course by name: {}", courseName);
        Optional<Course> course = courseService.findByCourseName(courseName);
        if (course.isPresent()) {
            logger.info("Course found: {}", course.get().getCourseName());
            return ResponseEntity.status(HttpStatus.OK).body(course.get());
        } else {
            logger.warn("Course not found with name: {}", courseName);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
