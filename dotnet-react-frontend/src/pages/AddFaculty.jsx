import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddFaculty.css";

const AddFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    photoUrl: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("https://localhost:7094/api/Faculty");
      if (Array.isArray(response.data)) {
        setFaculties(response.data);
      } else {
        setFaculties([]);
        console.error("Unexpected response format from /api/Faculty");
      }
    } catch (error) {
      console.error("Error fetching faculty", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      facultyName: form.name,
      teachingSubject: form.subject,
      photoUrl: form.photoUrl
    };

    try {
      if (editingId) {
        await axios.put(`https://localhost:7094/api/Faculty/${editingId}`, payload);
      } else {
        await axios.post("https://localhost:7094/api/Faculty", payload);
      }

      setForm({ name: "", subject: "", photoUrl: "" });
      setEditingId(null);
      fetchFaculties();
    } catch (error) {
      console.error("Error saving faculty", error);
    }
  };

  const handleEdit = (faculty) => {
    setForm({
      name: faculty.facultyName || "",
      subject: faculty.teachingSubject || "",
      photoUrl: faculty.photoUrl || ""
    });
    setEditingId(faculty.facultyId);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        await axios.delete(`https://localhost:7094/api/Faculty/${id}`);
        fetchFaculties();
      } catch (error) {
        console.error("Error deleting faculty", error);
      }
    }
  };

  return (
    <div className="faculty-container">
      <h2>{editingId ? "Edit Faculty" : "Add Faculty"}</h2>

      <form onSubmit={handleSubmit} className="faculty-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photoUrl"
          placeholder="Photo URL"
          value={form.photoUrl}
          onChange={handleChange}
        />

        <button type="submit">{editingId ? "Update" : "Add"} Faculty</button>
      </form>

      <div className="faculty-list">
        {Array.isArray(faculties) &&
          faculties.map((faculty) => (
            <div key={faculty.facultyId} className="faculty-card">
              <div className="faculty-photo">
                <img
                  src={faculty.photoUrl}
                  alt={faculty.facultyName}
                  onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = "/students/dac_march22/AJAY PATIL Sapiens.jpg";
                  }}
                />
              </div>
              <div className="faculty-info">
                <h3>{faculty.facultyName}</h3>
                <p>
                  <strong>Subject:</strong> {faculty.teachingSubject}
                </p>
              </div>
              <div className="faculty-actions">
                <button onClick={() => handleEdit(faculty)}>Edit</button>
                <button onClick={() => handleDelete(faculty.facultyId)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddFaculty;
