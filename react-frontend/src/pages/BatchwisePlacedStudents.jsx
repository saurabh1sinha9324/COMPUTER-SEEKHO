import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BatchwisePlacedStudents.css";

const BatchwisePlacedStudents = () => {
  const { batchId } = useParams();
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/placement/byBatchId/${batchId}`);
        const data = await res.json();
        setPlacements(data);
      } catch (error) {
        console.error("Error fetching placement data:", error);
      } finally {
        setTimeout(() => setLoading(false), 1200); // 3 sec delay
      }
    };

    fetchPlacements();
  }, [batchId]);

  const batchName = placements.length > 0 ? placements[0].batch?.batchName : "";

  return (
    <div className="placed-students">
      <h2>{batchName}</h2>

      <div className="placement-grid">
        {loading
          ? Array(6).fill(0).map((_, index) => (
              <div className="placement-card loading" key={index}>
                <div className="img-placeholder" />
                <p className="title placeholder" />
                <p className="company placeholder" />
              </div>
            ))
          : placements.map((placement) => (
              <div className="placement-card" key={placement.placementID}>
                <img
                  src={placement.studentPhoto}
                  alt={placement.studentName}
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "/default-student.jpg";
                  }}
                />
                <p className="title">{placement.studentName}</p>
                <p className="company">{placement.recruiter?.recruiterName}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BatchwisePlacedStudents;
