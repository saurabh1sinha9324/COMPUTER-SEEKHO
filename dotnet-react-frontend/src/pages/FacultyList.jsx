import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FacultyList.css";

const FacultyList = () => {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://localhost:7094/api/Faculty")
      .then((response) => setFaculties(response.data || []))
      .catch((error) => console.error("Error fetching faculties", error))
      .finally(() => setTimeout(() => setLoading(false), 1200));
  }, []);

  return (
    <div className="faculty-container-modern">
      <h2 className="faculty-heading">Our Faculties</h2>
      <div className="faculty-scroll">
        {loading
          ? Array(6).fill(0).map((_, idx) => (
              <div className="faculty-card skeleton" key={idx}>
                <div className="faculty-image-placeholder" />
                <div className="faculty-name-placeholder" />
                <div className="faculty-subject-placeholder" />
              </div>
            ))
          : faculties.length > 0
          ? faculties.map((faculty) => (
              <div className="faculty-card" key={faculty.facultyId}>
                <img
                  src={faculty.photoUrl}
                  alt={faculty.facultyName}
                  className="faculty-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-faculty.jpg";
                  }}
                />
                <h3 className="faculty-name">{faculty.facultyName}</h3>
                <p className="faculty-subject">
                  <strong>Subject:</strong> {faculty.teachingSubject}
                </p>
              </div>
            ))
          : <p className="no-data">No faculties found.</p>
        }
      </div>
    </div>
  );
};

export default FacultyList;
