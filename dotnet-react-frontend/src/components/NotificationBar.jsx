// src/components/NotificationBar.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotificationBar.css';

const NotificationBar = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('https://localhost:7094/api/announcements'); // Change if needed
        const data = Array.isArray(response.data) ? response.data : [];
        setAnnouncements(data);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

 return (
  <div className="notification-bar">
    <div className="marquee">
      <p>
        {announcements.length > 0
          ? announcements.map(item => item.announcementText).join('  |  ')
          : 'No announcements available'}
      </p>
    </div>
  </div>
);

};

export default NotificationBar;
