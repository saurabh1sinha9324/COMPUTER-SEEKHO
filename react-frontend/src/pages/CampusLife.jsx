import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CampusLife.css';

const API_URL = 'http://localhost:8080/api/campus-life';

const CampusLife = () => {
  const [campusList, setCampusList] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch all records
  const fetchCampusLife = async () => {
    const response = await axios.get(API_URL);
    setCampusList(response.data);
  };

  useEffect(() => {
    fetchCampusLife();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ title: '', description: '', imageUrl: '' });
      setEditingId(null);
      fetchCampusLife();
    } catch (err) {
      console.error('Error saving campus life:', err);
    }
  };

  // Edit existing
  const handleEdit = (campus) => {
    setFormData({
      title: campus.title,
      description: campus.description,
      imageUrl: campus.imageUrl,
    });
    setEditingId(campus.id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await axios.delete(`${API_URL}/${id}`);
      fetchCampusLife();
    }
  };

  return (
    <div className="campus-container">
      <h2>Campus Life</h2>
      <form className="campus-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <div className="campus-list">
        {campusList.map((campus) => (
          <div key={campus.id} className="campus-card">
            <img src={campus.imageUrl} alt={campus.title} />
            <h3>{campus.title}</h3>
            <p>{campus.description}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(campus)}>Edit</button>
              <button onClick={() => handleDelete(campus.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusLife;
