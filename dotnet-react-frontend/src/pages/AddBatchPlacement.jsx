

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddBatchPlacement.css";

const AddBatchPlacement = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    batchId: null,
    batchName: "",
    batchPhoto: "",
    batchStartTime: "",
    batchEndTime: "",
    batchPlacedPercent: "",
    batchIsActive: true,
    courseId: "", 
  });

  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);

  const fetchBatches = async () => {
    try {
      const res = await axios.get("https://localhost:7094/api/Batch");
      setBatches(res.data);
    } catch (err) {
      console.error("Failed to fetch batches:", err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://localhost:7094/api/Course");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  useEffect(() => {
    fetchBatches();
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
  batchId: formData.batchId,
  batchName: formData.batchName,
  batchPhoto: formData.batchPhoto.trim(),
  batchStartTime: formData.batchStartTime,
  batchEndTime: formData.batchEndTime,
  batchPlacedPercent: parseFloat(formData.batchPlacedPercent) || 0,
  batchIsActive: formData.batchIsActive,
  courseId: parseInt(formData.courseId)  
};


    try {
      if (formData.batchId) {
       await axios.put(`https://localhost:7094/api/Batch/${formData.batchId}`, payload);
        alert("Batch updated successfully!");
      } else {
        await axios.post("https://localhost:7094/api/Batch", payload);
        alert("Batch added successfully!");
      }

      setFormData({
        batchId: null,
        batchName: "",
        batchPhoto: "",
        batchStartTime: "",
        batchEndTime: "",
        batchPlacedPercent: "",
        batchIsActive: true,
        courseId: "",
      });

      fetchBatches();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save batch.");
    }
  };

  const handleEdit = (batch) => {
    setFormData({
      batchId: batch.batchId,
      batchName: batch.batchName,
      batchPhoto: batch.batchPhoto,
      batchStartTime: batch.batchStartTime || "",
      batchEndTime: batch.batchEndTime || "",
      batchPlacedPercent: batch.batchPlacedPercent || "",
      batchIsActive: batch.batchIsActive,
      courseId: batch.course?.courseId || "",
    });

    setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      try {
        await axios.delete(`https://localhost:7094/api/Batch/${id}`);
        alert("Batch deleted successfully!");
        fetchBatches();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete batch.");
      }
    }
  };

  return (
    <div className="add-placement-container">
      <div ref={formRef}>
        <h2 className="form-heading">
          {formData.batchId ? "Edit" : "Add"} Batch
        </h2>
        <form className="add-placement-form" onSubmit={handleSubmit}>
          <label>
            Batch Name:
            <input
              type="text"
              name="batchName"
              value={formData.batchName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Batch Photo Path:
            <input
              type="text"
              name="batchPhoto"
              placeholder="/public/batchwisePlacement/file.jpg"
              value={formData.batchPhoto}
              onChange={handleChange}
              required
            />
            <small className="note">
            Stored as: /public/batchwisePlacement/[filename]
          </small>
          </label>

          <label>
            Start Date:
            <input
              type="date"
              name="batchStartTime"
              value={formData.batchStartTime}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              name="batchEndTime"
              value={formData.batchEndTime}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Placement %:
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              name="batchPlacedPercent"
              value={formData.batchPlacedPercent}
              onChange={handleChange}
            />
          </label>

          <label>
            Course:
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
            >
              <option value="">--Select Course--</option>
              {courses.map((c) => (
                <option key={c.courseId} value={c.courseId}>
                  {c.courseName}
                </option>
              ))}
            </select>
          </label>

          <label>
            Is Active:
            <input
              type="checkbox"
              name="batchIsActive"
              checked={formData.batchIsActive}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-btn">
            {formData.batchId ? "Update" : "Add"} Batch
          </button>
        </form>
      </div>

      <h3 className="form-heading">All Batches</h3>
      <table className="placement-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Batch Name</th>
            <th>Placed %</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.batchId}>
              <td>{batch.batchId}</td>
              <td>{batch.batchName}</td>
              <td>{batch.batchPlacedPercent}%</td>
              <td>
                <img
                  src={batch.batchPhoto}
                  alt="logo"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>
                <button onClick={() => handleEdit(batch)} className="update-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(batch.batchId)} className="delete-btn">
                  Delete
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-batchwise-placed-students/${batch.batchId}`)
                  }
                  className="students-btn"
                >
                  Manage Student
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddBatchPlacement;
