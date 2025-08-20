import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BatchwisePlacement.css";

const BatchwisePlacement = () => {
  const [placementData, setPlacementData] = useState([]);
  const [loading, setLoading] = useState(true); // Step 1
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/batch")
      .then((res) => res.json())

      .then((data) => {
        setTimeout(() => {
          setPlacementData(data);
          setLoading(false);
        }, 1200); 
      })

      .catch((err) => console.error(err));
  }, []);

  const handleCardClick = (batchId) => {
    navigate(`/batchwise-placed-students/${batchId}`);
  };

  return (
    <div className="batchwise-placement">
      <h2>PG-DAC Batchwise Placement</h2>
      <div className="placement-grid">

        {loading
          ? Array(6)
              .fill(0)
              .map((_, idx) => (
                <div className="placement-card skeleton" key={idx}>
                  <div className="skeleton-img" />
                  <p className="skeleton-text title" />
                  <p className="skeleton-text percent" />
                </div>
              ))
          : placementData.map((batch) => (
              <div
                className="placement-card"
                key={batch.batchId}
                onClick={() => handleCardClick(batch.batchId)}
                style={{ cursor: "pointer" }}
              >
                <img src={batch.batchPhoto} alt={batch.batchName} />
                <p className="title">{batch.batchName}</p>
                <p className="percent">{batch.batchPlacedPercent}% Placement</p>
              </div>
            ))}

      </div>
    </div>
  );
};

export default BatchwisePlacement;
