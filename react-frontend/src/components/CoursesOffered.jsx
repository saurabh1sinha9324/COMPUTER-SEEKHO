import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CoursesOffered.css";
import { useNavigate } from "react-router-dom";

const CoursesOffered = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/courses");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/course")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div className="courses-container">
      <h2 className="courses-heading">All Courses</h2>
      <div className="courses-scroll-wrapper">
        {courses.map((course) => (
          <div
            className="course-card"
            key={course.courseId}
            onClick={handleRedirect}
          >
            <img
              src={course.coverPhoto}
              alt={course.courseName}
              className="course-image"
              onError={(e) => {
                e.target.src = "/default-course.jpg";
              }}
            />
            <div className="course-info">
              <h3>{course.courseName}</h3>
              <p>
                <strong>Duration:</strong> {course.courseDuration} Months
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesOffered;
