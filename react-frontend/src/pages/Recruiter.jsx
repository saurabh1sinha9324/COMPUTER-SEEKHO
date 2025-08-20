import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recruiter.css";

const Recruiter = () => {
  const [recruiters, setRecruiters] = useState([]);

  const fetchRecruiters = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/recruiter");
      setRecruiters(res.data || []);
    } catch (error) {
      console.error("Error fetching recruiters", error);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  return (
    <div className="recruiter-container">
      <h2 className="recruiter-heading">Our Recruiters</h2>
      <div className="recruiter-grid">
        {recruiters.length > 0 ? (
          recruiters.map((rec) => (
            <div key={rec.recruiterId} className="recruiter-card">
              <img
                src={rec.recruiterPhoto}
                alt={rec.recruiterName}
                className="recruiter-photo"
                onError={(e) => {
                  e.target.src = "/default-company.png";
                }}
              />
              <h4 className="recruiter-name">{rec.recruiterName}</h4>
              <p className="recruiter-location">{rec.recruiterLocation}</p>
            </div>
          ))
        ) : (
          <p className="no-data">No recruiters found.</p>
        )}
      </div>
    </div>
  );
};

export default Recruiter;
