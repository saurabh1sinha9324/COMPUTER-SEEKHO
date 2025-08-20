import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditBatchwisePlacedStudents.css";

const EditBatchwisePlacedStudents = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { batchId } = useParams();

  const [placements, setPlacements] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [recruiters, setRecruiters] = useState([]);

  const [formData, setFormData] = useState({
    placementID: null,
    studentId: "", // ✅ NEW field
    studentName: "",
    recruiterId: "",
    studentPhoto: "",
  });

  // Fetch recruiters for dropdown
  const fetchRecruiters = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/recruiter");
      setRecruiters(res.data || []);
    } catch (error) {
      console.error("Error fetching recruiters", error);
    }
  };

  // Fetch placements for this batch
  const fetchPlacements = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/placement/byBatchId/${batchId}`
      );
      const data = Array.isArray(res.data) ? res.data : [];
      setPlacements(data);

      if (data.length > 0) {
        setBatchName(data[0].batch?.batchName || "");
      } else {
        const batchRes = await axios.get(
          `http://localhost:8080/api/batch/byId/${batchId}`
        );
        setBatchName(batchRes.data?.batchName || "");
      }
    } catch (error) {
      console.error("Error fetching placements", error);
      setPlacements([]);
    }
  };

  useEffect(() => {
    fetchPlacements();
    fetchRecruiters();
  }, [batchId]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "recruiterId" && value === "add-new") {
      navigate("/manage-recruiter");
    }
  };

  // Add / Update placement
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      placementID: formData.placementID,
      studentId: parseInt(formData.studentId), // ✅ send studentId
      studentName: formData.studentName.trim(),
      studentPhoto: formData.studentPhoto.trim(),
      batch: { batchId: parseInt(batchId) },
      recruiter: { recruiterId: parseInt(formData.recruiterId) },
    };

    try {
      if (formData.placementID) {
        await axios.put(`http://localhost:8080/api/placement`, payload);
        alert("Placement updated successfully!");
      } else {
        await axios.post(`http://localhost:8080/api/placement`, payload);
        alert("Placement added successfully!");
      }

      setFormData({
        placementID: null,
        studentId: "",
        studentName: "",
        recruiterId: "",
        studentPhoto: "",
      });

      fetchPlacements();
    } catch (error) {
      console.error("Error saving placement", error);
      alert("Failed to save placement");
    }
  };

  const handleEdit = (placement) => {
    setFormData({
      placementID: placement.placementID,
      studentId: placement.studentId || "",
      studentName: placement.studentName,
      recruiterId: placement.recruiter?.recruiterId || "",
      studentPhoto: placement.studentPhoto,
    });

    setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`http://localhost:8080/api/placement/${id}`);
        fetchPlacements();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  return (
    <div className="student-management-container">
      <h2 ref={formRef}>
        Manage Placed Students - {batchName || `Batch ${batchId}`}
      </h2>

      <form className="student-form" onSubmit={handleSubmit}>
        {/* Student ID field */}
        <input
          type="number"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          required
        />

        {/* Recruiter Dropdown */}
        <select
          name="recruiterId"
          value={formData.recruiterId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Recruiter --</option>
          <option value="add-new">-- Add New --</option>
          {recruiters.map((rec) => (
            <option key={rec.recruiterId} value={rec.recruiterId}>
              {rec.recruiterName}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="studentPhoto"
          placeholder="/public/students/batchName/Name.jpg"
          value={formData.studentPhoto}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {formData.placementID ? "Update" : "Add"}
        </button>
      </form>

      <div className="student-cards">
        {placements.length > 0 ? (
          placements.map((placement) => (
            <div className="student-card" key={placement.placementID}>
              <img
                src={placement.studentPhoto}
                alt={placement.studentName}
                onError={(e) => {
                  e.target.src = "/default-student.jpg";
                }}
              />
              <div className="student-info">
                <h4>{placement.studentName}</h4>
                <p>{placement.recruiter?.recruiterName}</p>
                <div className="card-actions">
                  <button onClick={() => handleEdit(placement)}>Edit</button>
                  <button
                    onClick={() => handleDelete(placement.placementID)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No placements found for this batch.</p>
        )}
      </div>
    </div>
  );
};

export default EditBatchwisePlacedStudents;
