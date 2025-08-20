import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recruiter.css";

const Recruiter = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecruiters = async () => {
    try {
      const res = await axios.get("https://localhost:7094/api/Recruiter");
      setRecruiters(res.data || []);
    } catch (error) {
      console.error("Error fetching recruiters", error);
    } finally {
      setTimeout(() => setLoading(false), 1000); // delay for skeleton effect
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  return (
    <div className="recruiter-container-modern">
      <h2 className="recruiter-heading">Our Recruiters</h2>
      <div className="recruiter-grid">
        {loading
          ? Array(6).fill(0).map((_, idx) => (
              <div className="recruiter-card skeleton" key={idx}>
                <div className="recruiter-photo-placeholder" />
                <div className="recruiter-name-placeholder" />
                <div className="recruiter-location-placeholder" />
              </div>
            ))
          : recruiters.length > 0
          ? recruiters.map((rec) => (
              <div key={rec.recruiterId} className="recruiter-card">
                <img
                  src={rec.recruiterPhoto}
                  alt={rec.recruiterName}
                  className="recruiter-photo"
                  onError={(e) => { e.target.src = "/default-company.png"; }}
                />
                <h4 className="recruiter-name">{rec.recruiterName}</h4>
                <p className="recruiter-location">{rec.recruiterLocation}</p>
              </div>
            ))
          : <p className="no-data">No recruiters found.</p>
        }
      </div>
    </div>
  );
};

export default Recruiter;
