import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FacultyList.css";

const FacultyList = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    axios.get("/api/faculty")
      .then((response) => setFaculties(response.data))
      .catch((error) => console.error("Error fetching faculties", error));
  }, []);

  return (
    <div className="faculty-container">
      <h2>Our Faculties</h2>
      <div className="faculty-scroll">
        {faculties.map((faculty) => (
          <div className="faculty-card" key={faculty.id}>
            <img
              src={faculty.photoUrl || "https://via.placeholder.com/200x200?text=No+Image"}
              alt={faculty.name}
              className="faculty-image"
            />
            <h3>{faculty.name}</h3>
            <p><strong>Subject:</strong> {faculty.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyList;
