import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddFaculty.css";

const AddFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    active: false, // checkbox boolean
    photoUrl: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("/api/faculty");
      console.log("Faculty API response:", response.data);

      if (Array.isArray(response.data)) {
        setFaculties(response.data);
      } else if (Array.isArray(response.data.data)) {
        setFaculties(response.data.data);
      } else {
        setFaculties([]);
        console.error("Unexpected response format from /api/faculty");
      }
    } catch (error) {
      console.error("Error fetching faculty", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert boolean to tinyint
    const payload = {
      ...form,
      active: form.active ? 1 : 0
    };

    try {
      if (editingId) {
        await axios.put(`/api/faculty/${editingId}`, payload);
      } else {
        await axios.post("/api/faculty", payload);
      }

      setForm({
        name: "",
        subject: "",
        email: "",
        active: false,
        photoUrl: ""
      });
      setEditingId(null);
      fetchFaculties();
    } catch (error) {
      console.error("Error saving faculty", error);
    }
  };

  const handleEdit = (faculty) => {
    setForm({
      name: faculty.name || "",
      subject: faculty.subject || "",
      email: faculty.email || "",
      active: faculty.active === 1,
      photoUrl: faculty.photoUrl || ""
    });
    setEditingId(faculty.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        await axios.delete(`/api/faculty/${id}`);
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
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          Active
        </label>
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
            <div key={faculty.id} className="faculty-card">
              <div className="faculty-photo">
                {faculty.photoUrl ? (
                  <img
                    src={
                      faculty.photoUrl.startsWith("http")
                        ? faculty.photoUrl
                        : `/${faculty.photoUrl.replaceAll("\\", "/")}`
                    }
                    alt={faculty.name}
                  />
                ) : (
                  <img
                    src="https://placehold.co/150x150?text=No+Image"
                    alt="No Image"
                  />
                )}
              </div>
              <div className="faculty-info">
                <h3>{faculty.name}</h3>
                <p>
                  <strong>Subject:</strong> {faculty.subject}
                </p>
                <p>
                  <strong>Email:</strong> {faculty.email}
                </p>
                <p>
                  <strong>Active:</strong> {faculty.active === 1 ? "Yes" : "No"}
                </p>
              </div>
              <div className="faculty-actions">
                <button onClick={() => handleEdit(faculty)}>Edit</button>
                <button onClick={() => handleDelete(faculty.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddFaculty;
