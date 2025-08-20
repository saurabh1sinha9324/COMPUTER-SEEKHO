import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageStaff.css";

const API_URL = "http://localhost:8080/api/staff";

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [formData, setFormData] = useState({
    staffId: "",
    staffName: "",
    photoUrl: "",
    staffMobile: "",
    staffEmail: "",
    staffUsername: "",
    staffPassword: "",
    staffRole: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(API_URL);
      setStaffList(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.staffId}`, formData);
        alert("Staff updated successfully");
      } else {
        await axios.post(API_URL, formData);
        alert("Staff added successfully");
      }
      resetForm();
      fetchStaff();
    } catch (error) {
      console.error("Error saving staff:", error);
      alert("Error saving staff");
    }
  };

  const handleEdit = (staff) => {
    setFormData(staff);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Staff deleted successfully");
        fetchStaff();
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      staffId: "",
      staffName: "",
      photoUrl: "",
      staffMobile: "",
      staffEmail: "",
      staffUsername: "",
      staffPassword: "",
      staffRole: ""
    });
    setIsEditing(false);
  };

  return (
    <div className="manage-staff-container">
      <h2>{isEditing ? "Edit Staff" : "Add Staff"}</h2>
      <form onSubmit={handleSubmit} className="staff-form">
        <input type="text" name="staffName" placeholder="Name" value={formData.staffName} onChange={handleChange} required />
        <input type="text" name="photoUrl" placeholder="Photo URL" value={formData.photoUrl} onChange={handleChange} />
        <input type="text" name="staffMobile" placeholder="Mobile" value={formData.staffMobile} onChange={handleChange} required />
        <input type="email" name="staffEmail" placeholder="Email" value={formData.staffEmail} onChange={handleChange} required />
        <input type="text" name="staffUsername" placeholder="Username" value={formData.staffUsername} onChange={handleChange} required />
        {!isEditing && (
          <input type="password" name="staffPassword" placeholder="Password" value={formData.staffPassword} onChange={handleChange} required />
        )}
        <input type="text" name="staffRole" placeholder="Role" value={formData.staffRole} onChange={handleChange} required />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
        {isEditing && <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>}
      </form>

      <h2>Staff List</h2>
      <table className="staff-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.staffId}>
              <td>{staff.staffId}</td>
              <td>
                {staff.photoUrl ? (
                  <img src={staff.photoUrl} alt={staff.staffName} className="staff-photo" />
                ) : (
                  "No photo"
                )}
              </td>
              <td>{staff.staffName}</td>
              <td>{staff.staffMobile}</td>
              <td>{staff.staffEmail}</td>
              <td>{staff.staffUsername}</td>
              <td>{staff.staffRole}</td>
              <td>
                <button onClick={() => handleEdit(staff)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(staff.staffId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStaff;
