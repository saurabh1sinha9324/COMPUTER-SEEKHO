import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CampusLife.css';

const API_URL = 'https://localhost:7094/api/CampusLife'; // Adjust port if needed

const CampusLife = () => {
  const [campusList, setCampusList] = useState([]);
  const [formData, setFormData] = useState({ photoUrl: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch all campus life records
  const fetchCampusLife = async () => {
    try {
      const response = await axios.get(API_URL);
      setCampusList(response.data);
    } catch (err) {
      console.error('Error fetching campus life:', err);
    }
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
      setFormData({ photoUrl: '', description: '' });
      setEditingId(null);
      fetchCampusLife();
    } catch (err) {
      console.error('Error saving campus life:', err);
    }
  };

  // Edit existing
  const handleEdit = (campus) => {
    setFormData({
      photoUrl: campus.photoUrl,
      description: campus.description,
    });
    setEditingId(campus.campusLifeId);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCampusLife();
      } catch (err) {
        console.error('Error deleting campus life:', err);
      }
    }
  };

  return (
    <div className="campus-container">
      <h2>Campus Life</h2>

      <form className="campus-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="photoUrl"
          placeholder="Image URL"
          value={formData.photoUrl}
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
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <div className="campus-list">
        {campusList.map((campus) => (
          <div key={campus.campusLifeId} className="campus-card">
            {campus.photoUrl && <img src={campus.photoUrl} alt="Campus Life" />}
            <p>{campus.description}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(campus)}>Edit</button>
              <button onClick={() => handleDelete(campus.campusLifeId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusLife;
