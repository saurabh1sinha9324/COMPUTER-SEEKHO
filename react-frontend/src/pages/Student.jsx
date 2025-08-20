// Student.jsx (styled version)
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Student.css";

const Student = () => {
  const navigate = useNavigate();
  const { studentId: paramId } = useParams();
  const { state } = useLocation();
  const studentData = state?.studentData;
  const studentId = studentData?.studentId || paramId;

  if (!studentId) {
    return <div className="error-message">❌ Error: Student ID not found.</div>;
  }

  return (
    <div className="student-confirmation">
      <div className="confirmation-card">
        <h2 className="success-msg">✅ Student Registered Successfully</h2>

        <div className="info">
          <p><strong>Student ID:</strong> {studentId}</p>
          <p><strong>Name:</strong> {studentData.enquiry?.studentName || "N/A"}</p>
          <p><strong>Gender:</strong> {studentData?.studentGender || "N/A"}</p>
          <p><strong>DOB:</strong> {studentData?.studentDob || "N/A"}</p>
          <p><strong>Qualification:</strong> {studentData?.studentQualification || "N/A"}</p>
          <p><strong>Batch:</strong> {studentData?.batch?.batchName || "N/A"}</p>
          <p><strong>Course:</strong> {studentData?.course?.courseName || "N/A"}</p>
        </div>

        <button
          className="proceed-btn"
          onClick={() => navigate(`/payments/${studentId}`)}
        >
          💳 Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Student;
