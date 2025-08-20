import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Campus.css";

const Campus = () => {
  const [campusData, setCampusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://localhost:7094/api/CampusLife")
      .then((response) => setCampusData(response.data || []))
      .catch((error) => console.error("Error fetching campus life data:", error))
      .finally(() => setTimeout(() => setLoading(false), 1200));
  }, []);

  return (
    <div className="campus-container-modern">
      <h2 className="campus-title">Campus Life</h2>

      <div className="campus-grid">
        {loading
          ? Array(6).fill(0).map((_, idx) => (
              <div className="campus-card skeleton" key={idx}>
                <div className="campus-image-placeholder" />
                <div className="campus-description-placeholder" />
              </div>
            ))
          : campusData.length > 0
          ? campusData.map((item) => (
              <div key={item.campusLifeId} className="campus-card">
                {item.photoUrl && (
                  <img
                    src={item.photoUrl}
                    alt="Campus Life"
                    className="campus-image"
                    onError={(e) => { e.target.src = "/default-campus.jpg"; }}
                  />
                )}
                <p className="campus-description">{item.description}</p>
              </div>
            ))
          : <p className="no-data">No campus life data found.</p>
        }
      </div>
    </div>
  );
};

export default Campus;
