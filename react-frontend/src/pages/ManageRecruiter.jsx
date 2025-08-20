import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ManageRecruiter.css";

const ManageRecruiter = () => {
  const formRef = useRef(null);
  const [recruiters, setRecruiters] = useState([]);
  const [formData, setFormData] = useState({
    recruiterId: null,
    recruiterName: "",
    recruiterLocation: "",
    recruiterPhoto: "",
  });

  // Fetch recruiters
  const fetchRecruiters = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/recruiter");
      setRecruiters(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching recruiters:", error);
      setRecruiters([]);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add / Update recruiter
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      recruiterId: formData.recruiterId,
      recruiterName: formData.recruiterName.trim(),
      recruiterLocation: formData.recruiterLocation.trim(),
      recruiterPhoto: formData.recruiterPhoto.trim(),
    };

    try {
      if (formData.recruiterId) {
        await axios.put("http://localhost:8080/api/recruiter", payload);
        alert("Recruiter updated successfully!");
      } else {
        await axios.post("http://localhost:8080/api/recruiter", payload);
        alert("Recruiter added successfully!");
      }
      setFormData({
        recruiterId: null,
        recruiterName: "",
        recruiterLocation: "",
        recruiterPhoto: "",
      });
      fetchRecruiters();
    } catch (error) {
      console.error("Error saving recruiter:", error);
    }
  };

  // Edit recruiter
  const handleEdit = (rec) => {
    setFormData({
      recruiterId: rec.recruiterId,
      recruiterName: rec.recruiterName,
      recruiterLocation: rec.recruiterLocation,
      recruiterPhoto: rec.recruiterPhoto,
    });
    setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Delete recruiter
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recruiter?")) {
      try {
        await axios.delete(`http://localhost:8080/api/recruiter/${id}`);
        alert("Recruiter deleted successfully!");
        fetchRecruiters();
      } catch (error) {
        console.error("Error deleting recruiter:", error);
      }
    }
  };

  return (
    <div className="manage-recruiter-container">
      <h2 ref={formRef}>
        {formData.recruiterId ? "Edit Recruiter" : "Add Recruiter"}
      </h2>

      {/* Form */}
      <form className="recruiter-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="recruiterName"
          placeholder="Recruiter Name"
          value={formData.recruiterName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="recruiterLocation"
          placeholder="Location"
          value={formData.recruiterLocation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="recruiterPhoto"
          placeholder="/public/recruiters/logo.png"
          value={formData.recruiterPhoto}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {formData.recruiterId ? "Update" : "Add"}
        </button>
      </form>

      {/* Recruiters List */}
      <h3>Recruiter List</h3>
      <div className="recruiter-grid">
        {recruiters.length > 0 ? (
          recruiters.map((rec) => (
            <div className="recruiter-card" key={rec.recruiterId}>
              <img
                src={rec.recruiterPhoto}
                alt={rec.recruiterName}
                className="recruiter-photo"
                onError={(e) => (e.target.src = "/default-company.png")}
              />
              <h4>{rec.recruiterName}</h4>
              <p>{rec.recruiterLocation}</p>
              <div className="card-actions">
                <button onClick={() => handleEdit(rec)}>Edit</button>
                <button
                  onClick={() => handleDelete(rec.recruiterId)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No recruiters found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageRecruiter;
