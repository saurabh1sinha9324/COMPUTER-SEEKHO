'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './enquiries.css';

/**
 * Replace with the actual URL of your Spring‑Boot API.
 * You can also move this to an environment variable.
 */
const API_URL = 'http://localhost:8080/api/enquiry';

const AdminEnquiriesPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch enquiries');
        return res.json();
      })
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      <main className="admin-container">
        <h1>Enquiries (Admin)</h1>

        {loading && <p>Loading…</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <table className="enq-table">
            <thead>
              <tr>
                <th>Enquirer&nbsp;Name</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Enquiry&nbsp;Date</th>
                <th>Course&nbsp;ID</th>
                <th>Processed?</th>
                <th>Follow‑up&nbsp;Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.enquiryId ?? row.enquirerEmailId}>
                  <td>{row.enquirerName}</td>
                  <td>{row.enquirerAddress}</td>
                  <td>{row.enquirerMobile}</td>
                  <td>{row.enquirerEmailId}</td>
                  <td>{row.enquiryDate}</td>
                  <td>{row.courseId}</td>
                  <td>{row.enquiryProcessedFlag ? 'Yes' : 'No'}</td>
                  <td>{row.followUpDate}</td>
                  <td>
                    {/* replace with real routes / modals later */}
                    <button className="btn-view">View / Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <Footer />
    </>
  );
};

export default AdminEnquiriesPage;
