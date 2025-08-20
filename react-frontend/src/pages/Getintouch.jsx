import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetInTouch.css';

const GetInTouch = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [info, setInfo] = useState({ origin: '', reach: '' });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/getintouch')
      .then(res => setInfo(res.data))
      .catch(err => console.error('Failed to load contact info', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage('Sending...');

    const payload = {
      enquirerName: formData.name,
      enquirerEmailId: formData.email,
      enquirerQuery: formData.message
    };

    axios.post('http://localhost:8080/api/enquiry', payload)
      .then(() => {
        setStatusMessage('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => setStatusMessage('❌ Failed to send message.'));
  };

  return (
    <div className="getintouch-container">
      <div className="contact-section">
        {/* LEFT COLUMN */}
        <div className="contact-details">
          <h2 className="section-title">Our Origin</h2>
          <p className="section-text">
            {info.origin || 
              `We are a part of Upanagar Shikshan Mandal (USM), a pioneering educational trust in the western suburbs of Mumbai. Commencing in 1956, USM has blossomed into 14 educational institutes that impart quality education from primary school to Post-Graduate courses.`
            }
          </p>

          {/* Updated heading with extra class */}
          <h2 className="section-title reach-us-title" style={{ marginTop: '64px' }}>Reach us at</h2>

          {/* Updated paragraph with extra class */}
          <p className="section-text reach-us-text">
            <strong>Authorised Training Centre</strong><br />
            {info.reach || 
              `5th Floor, Vidyanidhi Education Complex, Vidyanidhi Road, Juhu Scheme, Andheri (W), Mumbai 400 049 India.`
            }
            <br></br>
            <strong>Mobile : </strong>9029435311 / 9324095272 / 9987062416
             <br></br>
            <strong>Email : </strong>
            <a href="mailto:training@vidyanidhi.com">training@vidyanidhi.com</a>
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="contact-map-form">
          <div className="map-container">
            <iframe
              title="Vidyanidhi Map"
              src="https://maps.google.com/maps?q=vidyanidhi%20education%20complex&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Get In Touch With Us !</h2>
            <p className="form-subtitle">Fill out the form below</p>

            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message (max 500 characters)*"
              value={formData.message}
              onChange={handleChange}
              maxLength="500"
              required
            />
            <button type="submit">Send</button>
            {statusMessage && (
              <p className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;