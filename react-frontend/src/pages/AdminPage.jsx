import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [followUps, setFollowUps] = useState([]);

  const staffData = JSON.parse(localStorage.getItem("staffData")) || {};

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
    navigate("/");
  };

  // Auto-logout after 10 min
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
    setTimeout(() => {
      sessionStorage.clear();
      window.location.href = "/login";
    }, 10 * 60 * 1000);
  }, []);

  // Fetch upcoming follow-ups
  const fetchFollowUps = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/enquiry/getByStaffId/${staffData.staffId}`
      );
      setFollowUps(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching follow-ups", err);
      setFollowUps([]);
    }
  };

  useEffect(() => {
    if (staffData.staffId) {
      fetchFollowUps();
    }
  }, [staffData.staffId]);

  // Go to manage enquiry with prefilled data
  const handleEditRedirect = (enquiry) => {
    navigate("/manage-enquiry", { state: { editData: enquiry } });
  };

  return (
    <div className="admin-container">
      <div>
        {/* Header */}
        <div className="admin-header">
          <div className="admin-info">
            <h1>
              Welcome, <span>{staffData.staffName || "Staff"}</span>
            </h1>
            <p>Role: {staffData.staffRole || "N/A"}</p>
            <small>Token: {staffData.token || "N/A"}</small>

          </div>
          <img
            src={staffData.photoUrl || "/default-staff.jpg"}
            alt="Staff"
            className="staff-photo"
          />
        </div>

        {/* Action Buttons */}
        <div className="admin-actions">
          <button
            className="btn btn-green"
            onClick={() => navigate("/manage-enquiry")}>
            ➕ Manage Enquiry
          </button>
          <button
            className="btn btn-blue"
            onClick={() => navigate("/manage-data")}>
            📂 Manage Website Data
          </button>
          <button
            className="btn btn-purple"
            onClick={() => navigate("/manage-staff")}>
            👥 Manage Staff
          </button>
          <button className="btn btn-red" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Follow-Up Table */}
      <h2 className="sub-heading">📞 Upcoming Follow-Ups</h2>
      <div className="table-wrapper">
        <table className="followup-table">
          <thead>
            <tr>
              <th>Enquiry ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Follow-up Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {followUps.length > 0 ? (
              [...followUps] // copy array so original state is not mutated
                .sort((a, b) => {
                  const today = new Date();
                  const diffA = Math.abs(new Date(a.followUpDate) - today);
                  const diffB = Math.abs(new Date(b.followUpDate) - today);
                  return diffA - diffB; // smaller difference comes first
                })
                .map((entry) => (
                  <tr key={entry.enquiryId}>
                    <td>{entry.enquiryId}</td>
                    <td>{entry.enquirerName}</td>
                    <td>{entry.enquirerMobile}</td>
                    <td>{entry.followUpDate}</td>
                    <td>
                      <button
                        onClick={() => handleEditRedirect(entry)}
                        className="btn btn-yellow">
                        📞 Call
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6">No Follow-Ups Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
