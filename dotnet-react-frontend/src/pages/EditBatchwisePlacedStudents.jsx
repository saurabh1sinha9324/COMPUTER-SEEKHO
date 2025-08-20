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
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    placementID: null,
    studentId: "",
    studentName: "",
    recruiterId: "",
    studentPhoto: "",
  });

  const fetchRecruiters = async () => {
    try {
      const res = await axios.get("https://localhost:7094/api/Recruiter");
      setRecruiters(res.data || []);
    } catch (error) {
      console.error("Error fetching recruiters", error);
    }
  };

  const fetchPlacements = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7094/api/Placement/batch/${batchId}`
      );
      const data = Array.isArray(res.data) ? res.data : [];
      setPlacements(data);

      if (data.length > 0) {
        setBatchName(data[0].batch?.batchName || "");
      } else {
        const batchRes = await axios.get(
          `https://localhost:7094/api/Batch/${batchId}`
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      placementId: formData.placementID ? Number(formData.placementID) : 0,
      studentId: Number(formData.studentId),
      studentName: formData.studentName.trim(),
      studentPhoto: formData.studentPhoto.trim(),
      recruiterId: Number(formData.recruiterId),
      batchId: Number(batchId),
    };

    try {
      if (formData.placementID) {
        await axios.put(
          `https://localhost:7094/api/Placement/${Number(
            formData.placementID
          )}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("Placement updated successfully!");
      } else {
        await axios.post(`https://localhost:7094/api/Placement`, payload, {
          headers: { "Content-Type": "application/json" },
        });
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
        await axios.delete(`https://localhost:7094/api/Placement/${Number(id)}`, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Deleted successfully!");
        fetchPlacements();
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete placement");
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await fetch(
        `https://localhost:7094/api/Placement/batch/${batchId}`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      if (response.ok) {
        alert("File uploaded successfully!");
        fetchPlacements();
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
    }
  };

  return (
    <div className="student-management-container">
      <h2 ref={formRef}>
        Manage Placed Students - {batchName || `Batch ${batchId}`}
      </h2>

      {/* ✅ Styled File Upload Section */}
      <div className="file-upload-section">
        <label className="file-label">
          Choose File
          <input type="file" onChange={handleFileChange} />
        </label>
        <button onClick={handleFileUpload}>Upload</button>
        {file && <span className="file-name">{file.name}</span>}
      </div>

      <form className="student-form" onSubmit={handleSubmit}>
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
                src={placement.studentPhoto || "/default-course.png"}
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
