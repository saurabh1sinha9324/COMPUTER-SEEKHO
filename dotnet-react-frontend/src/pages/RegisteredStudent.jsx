import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisteredStudent.css";

const RegisteredStudent = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudentsWithPayments = async () => {
    try {
      const studentRes = await fetch("https://localhost:7094/api/Student");
      const studentData = await studentRes.json();

      // Fetch payment data for each student to calculate updated payment due
      const updatedStudents = await Promise.all(
        studentData.map(async (student) => {
          try {
            const payRes = await fetch(
              `https://localhost:7094/api/Payment/by-student/${student.studentId}`
            );
            const payments = await payRes.json();

            const totalPaid = Array.isArray(payments)
              ? payments.reduce((sum, p) => sum + p.amount, 0)
              : 0;

            return {
              ...student,
              actualPaymentDue: student.paymentDue - totalPaid,
            };
          } catch (error) {
            console.error(`Error fetching payments for student ${student.studentId}:`, error);
            return {
              ...student,
              actualPaymentDue: student.paymentDue,
            };
          }
        })
      );

      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudentsWithPayments();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-info">
          <h1>📚 Registered <span>Students</span></h1>
          <p>List of all registered students with payment status.</p>
        </div>
      </div>

      <h2 className="sub-heading">Student Details</h2>

      <div className="table-wrapper">
        <table className="followup-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Date</th>
              <th>Course</th>
              <th>Student Id</th>
              <th>Payment Due</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentId}>
                <td>
                  <img
                    src={student.photoUrl}
                    alt="student"
                    className="student-table-photo"
                    onError={(e) => (e.target.src = "/default-student.jpg")}
                  />
                </td>
                <td>{student.enquiry?.studentName || "N/A"}</td>
                <td>{student.enquiry?.enquiryDate?.split("T")[0] || "N/A"}</td>
                <td>{student.course?.courseName || "N/A"}</td>
                <td>{student.studentId}</td>
                <td>
                  ₹{student.actualPaymentDue?.toFixed(2) ?? student.paymentDue}
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/payments/${student.studentId}`)}
                  >
                    💳 Payments
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredStudent;
