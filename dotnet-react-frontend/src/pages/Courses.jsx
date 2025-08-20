import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://localhost:7094/api/Course")
      .then((res) => setCourses(res.data || []))
      .catch((err) => console.error("Error fetching courses:", err))
      .finally(() => setTimeout(() => setLoading(false), 1200));
  }, []);

  return (
    <div className="courses-container-modern">
      <h2 className="courses-heading">All Courses</h2>
      <div className="courses-grid">
        {loading
          ? Array(6).fill(0).map((_, idx) => (
              <div className="course-card skeleton" key={idx}>
                <div className="course-image-placeholder" />
                <div className="course-info-placeholder" />
              </div>
            ))
          : courses.map((course) => (
              <div className="course-card" key={course.courseId}>
                <img
                  src={course.coverPhoto || "/default-course.png"}
                  alt={course.courseName}
                  className="course-image"
                  onError={(e) => { e.target.src = "/default-course.jpg"; }}
                />

                <div className="course-info">
                  <h3 className="course-title">{course.courseName}</h3>
                  <ul className="course-details-list">
                    <li><span>💰 Fee:</span> ₹{course.courseFee}</li>
                    <li><span>⏳ Duration:</span> {course.courseDuration} Months</li>
                    <li><span>👦 Age Group:</span> {course.ageGrpType}</li>
                    <li>
                      <span>📌 Status:</span>
                      <span className={course.courseIsActive ? "status active" : "status inactive"}>
                        {course.courseIsActive ? "Active" : "Inactive"}
                      </span>
                    </li>
                  </ul>
                  <p className="course-description">{course.courseDescription}</p>
                  <details className="syllabus-toggle">
                    <summary>📚 View Syllabus</summary>
                    <div className="syllabus-content">{course.courseSyllabus}</div>
                  </details>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Courses;
