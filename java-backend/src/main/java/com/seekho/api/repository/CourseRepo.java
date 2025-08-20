package com.seekho.api.repository;


import com.seekho.api.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Repository
@Transactional
public interface CourseRepo extends JpaRepository<Course, Integer>{
    @Query("select c from Course c where c.courseName = ?1")
    Optional<Course> findCourseByName(String courseName);
}
