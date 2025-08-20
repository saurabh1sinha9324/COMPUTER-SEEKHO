import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BatchwisePlacement.css";

const BatchwisePlacement = () => {
  const [placementData, setPlacementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7094/api/Batch")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setPlacementData(data);
          setLoading(false);
        }, 1000); // fake loading delay
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCardClick = (batchId) => {
    navigate(`/batchwise-placed-students/${batchId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="batchwise-placement-modern">
      <h2>PG-DAC Batchwise Placement</h2>
      <div className="placement-grid">
        {loading
          ? Array(6).fill(0).map((_, idx) => (
              <div className="placement-card skeleton" key={idx}>
                <div className="skeleton-img" />
                <div className="skeleton-text title" />
                <div className="skeleton-progress" />
              </div>
            ))
          : placementData.map((batch) => (
              <div
                className="placement-card"
                key={batch.batchId}
                onClick={() => handleCardClick(batch.batchId)}
              >
                <div className="card-image-wrapper">
                  <img src={batch.batchPhoto} alt={batch.batchName} />
                </div>
                <p className="title">{batch.batchName}</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${batch.batchPlacedPercent}%` }}
                  >
                    <span>{batch.batchPlacedPercent}%</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BatchwisePlacement;
