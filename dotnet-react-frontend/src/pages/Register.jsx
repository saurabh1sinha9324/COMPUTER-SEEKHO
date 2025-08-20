import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const enquiryData = location.state?.enquiryData || {};
  const formRef = useRef(null);

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  const [formData, setFormData] = useState({
    enquiryId: "",
    enquirerName: "",
    enquirerAddress: "",
    enquirerMobile: "",
    enquirerEmailId: "",
    enquiryDate: "",
    enquirerQuery: "",
    courseName: "",
    courseId: "",
    studentName: "",
    studentGender: "",
    studentDob: "",
    studentQualification: "",
    batchId: "",
    followUpDate: "",
    enquiryCounter: 0,
    enquiryIsActive: true,
    photoUrl: "",
    staffId: 1
  });

  useEffect(() => {
    // Fetch courses & batches
    axios.get("https://localhost:7094/api/Course").then(res => setCourses(res.data));
    axios.get("https://localhost:7094/api/Batch").then(res => setBatches(res.data));
  }, []);

  useEffect(() => {
    if (enquiryData.enquiryId) {
      setFormData(prev => ({
        ...prev,
        enquiryId: enquiryData.enquiryId,
        enquirerName: enquiryData.enquirerName || "",
        enquirerAddress: enquiryData.enquirerAddress || "",
        enquirerMobile: enquiryData.enquirerMobile || "",
        enquirerEmailId: enquiryData.enquirerEmailId || "",
        enquiryDate: enquiryData.enquiryDate?.split("T")[0] || "",
        enquirerQuery: enquiryData.enquirerQuery || "",
        courseName: enquiryData.courseName || "",
        studentName: enquiryData.studentName || enquiryData.enquirerName || "",
        enquiryCounter: enquiryData.enquiryCounter || 0,
        followUpDate: enquiryData.followUpDate?.split("T")[0] || "",
        enquiryIsActive: false, // Will be inactive after registration
        courseId: enquiryData.course?.courseId || "",
        batchId: enquiryData.batch?.batchId || "",
        staffId: enquiryData.staffId || 1
      }));
    }
  }, [enquiryData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Update enquiry (set inactive)
      const updateEnquiryPayload = {
        enquiryId: Number(formData.enquiryId),
        enquirerName: formData.enquirerName,
        enquirerAddress: formData.enquirerAddress || null,
        enquirerMobile: formData.enquirerMobile,
        enquirerEmailId: formData.enquirerEmailId || null,
        enquiryDate: formData.enquiryDate ? new Date(formData.enquiryDate).toISOString() : null,
        enquirerQuery: formData.enquirerQuery || null,
        courseName: formData.courseName || null,
        studentName: formData.studentName || null,
        enquiryCounter: formData.enquiryCounter || 0,
        followUpDate: formData.followUpDate ? new Date(formData.followUpDate).toISOString() : null,
        enquiryIsActive: false,
        staffId: Number(formData.staffId) || 1
      };

      await axios.put(`https://localhost:7094/api/Enquiry/${formData.enquiryId}`, updateEnquiryPayload);

      // 2️⃣ Register student
      const selectedCourse = courses.find(c => c.courseId === Number(formData.courseId));
      const studentPayload = {
        studentName: formData.studentName || formData.enquirerName,
        studentGender: formData.studentGender || null,
        studentDob: formData.studentDob ? new Date(formData.studentDob).toISOString() : null,
        studentQualification: formData.studentQualification || null,
        photoUrl: formData.photoUrl || null,
        batchId: formData.batchId ? Number(formData.batchId) : null,
        courseId: formData.courseId ? Number(formData.courseId) : null,
        enquiryId: Number(formData.enquiryId),
        paymentDue: selectedCourse ? Number(selectedCourse.courseFee) : 0
      };

      await axios.post("https://localhost:7094/api/Student", studentPayload);

      // 3️⃣ Fetch registered student to get studentId
      setTimeout(async () => {
        const res = await axios.get("https://localhost:7094/api/Student");
        const newStudent = res.data.find(s => s.enquiryId === Number(formData.enquiryId));

        if (newStudent?.studentId) {
          alert("Student Registered Successfully & Enquiry Closed");
          navigate(`/student/${newStudent.studentId}`, { state: { studentData: newStudent } });
        } else {
          alert("Registration succeeded but Student ID not found");
        }
      }, 1000);

    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Student Registration Failed | Check if Already Registered");
    }
  };

  return (
    <div className="register-container" ref={formRef}>
      <h2>Register Student from Enquiry</h2>
      <form className="register-form two-column" onSubmit={handleRegister}>
        <div>
          <small>Enquirer Name:</small>
          <input
            type="text"
            name="enquirerName"
            value={formData.enquirerName}
            onChange={handleChange}
            placeholder="Enquirer Name"
            required
          />
        </div>

        <div>
          <small>Address:</small>
          <input
            type="text"
            name="enquirerAddress"
            value={formData.enquirerAddress}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div>
          <small>Mobile:</small>
          <input
            type="text"
            name="enquirerMobile"
            value={formData.enquirerMobile}
            onChange={handleChange}
            placeholder="Mobile"
            required
          />
        </div>

        <div>
          <small>Email:</small>
          <input
            type="email"
            name="enquirerEmailId"
            value={formData.enquirerEmailId}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div>
          <small>Select Course:</small>
          <select name="courseId" value={formData.courseId} onChange={handleChange}>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.courseId} value={course.courseId}>{course.courseName}</option>
            ))}
          </select>
        </div>

        <div>
          <small>Select Batch:</small>
          <select name="batchId" value={formData.batchId} onChange={handleChange}>
            <option value="">Select Batch</option>
            {batches.map(batch => (
              <option key={batch.batchId} value={batch.batchId}>{batch.batchName}</option>
            ))}
          </select>
        </div>

        <div>
          <small>Student Name:</small>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Student Name"
          />
        </div>

        <div>
          <small>Gender:</small>
          <input
            type="text"
            name="studentGender"
            value={formData.studentGender}
            onChange={handleChange}
            placeholder="Gender"
          />
        </div>

        <div>
          <small>Date of Birth:</small>
          <input
            type="date"
            name="studentDob"
            value={formData.studentDob}
            onChange={handleChange}
          />
        </div>

        <div>
          <small>Qualification:</small>
          <input
            type="text"
            name="studentQualification"
            value={formData.studentQualification}
            onChange={handleChange}
            placeholder="Qualification"
          />
        </div>

        <div>
          <small>Photo URL:</small>
          <input
            type="text"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="Photo URL"
          />
        </div>

        <div>
          <small>Active:</small>
          <input
            type="checkbox"
            name="enquiryIsActive"
            checked={formData.enquiryIsActive}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="full-width">
          <button type="submit">Register Student</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
