import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddMarquee.css';

const AddMarquee = () => {
  const [announcementText, setAnnouncementText] = useState('');
  const [message, setMessage] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('https://localhost:7094/api/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnnouncement = {
      announcementText // matches backend DTO property
    };

    try {
      if (editingId === null) {
        // Add
        await axios.post('https://localhost:7094/api/announcements', newAnnouncement);
        setMessage('Announcement added successfully!');
      } else {
        // Edit
        await axios.put(`https://localhost:7094/api/announcements/${editingId}`, {
          announcementId: editingId,
          announcementText
        });
        setMessage('Announcement updated successfully!');
      }

      setAnnouncementText('');
      setEditingId(null);
      fetchAnnouncements();
    } catch (error) {
      console.error(error);
      setMessage('Error saving announcement.');
    }
  };

  const handleEdit = (announcement) => {
    setAnnouncementText(announcement.announcementText);
    setEditingId(announcement.announcementId);
    setMessage('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7094/api/announcements/${id}`);
      setMessage('Announcement deleted successfully!');
      fetchAnnouncements();
    } catch (error) {
      console.error(error);
      setMessage('Error deleting announcement.');
    }
  };

  return (
    <div className="add-marquee-container">
      <h2>{editingId ? 'Edit Announcement' : 'Add New Announcement'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="announcementText">Announcement Description:</label>
          <input
            type="text"
            id="announcementText"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            required
          />
        </div>

        <button type="submit">{editingId ? 'Update' : 'Add'} Announcement</button>
        {message && <p className="message">{message}</p>}
      </form>

      <hr />

      <h3>All Announcements</h3>
      <ul className="announcement-list">
        {announcements.map((ann) => (
          <li key={ann.announcementId}>
            <strong>{ann.announcementText}</strong>
            <div className="actions">
              <button onClick={() => handleEdit(ann)}>Edit</button>
              <button onClick={() => handleDelete(ann.announcementId)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddMarquee;
