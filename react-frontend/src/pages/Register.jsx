

//version3
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
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/course").then((res) => setCourses(res.data));
    axios.get("http://localhost:8080/api/batch").then((res) => setBatches(res.data));
  }, []);

  useEffect(() => {
    if (enquiryData.enquiryId) {
      setFormData((prev) => ({
        ...prev,
        enquiryId: enquiryData.enquiryId,
        enquirerName: enquiryData.enquirerName || "",
        enquirerAddress: enquiryData.enquirerAddress || "",
        enquirerMobile: enquiryData.enquirerMobile || "",
        enquirerEmailId: enquiryData.enquirerEmailId || "",
        enquiryDate: enquiryData.enquiryDate || "",
        enquirerQuery: enquiryData.enquirerQuery || "",
        courseName: enquiryData.courseName || enquiryData.coursName || "",
        studentName: enquiryData.studentName || enquiryData.enquirerName || "",
        enquiryCounter: enquiryData.enquiryCounter || 0,
        followUpDate: enquiryData.followUpDate || "",
        enquiryIsActive: enquiryData.enquiryIsActive ?? true,
        courseId: enquiryData.course?.courseId || "",
        batchId: enquiryData.batch?.batchId || "",
      }));
    }
  }, [enquiryData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const handleRegister = async (e) => {
  e.preventDefault();

  try {
    // 1. Update enquiry
    await axios.put("http://localhost:8080/api/enquiry", {
      enquiryId: formData.enquiryId,
      enquirerName: formData.enquirerName,
      enquirerAddress: formData.enquirerAddress,
      enquirerMobile: formData.enquirerMobile,
      enquirerEmailId: formData.enquirerEmailId,
      enquiryDate: formData.enquiryDate,
      enquirerQuery: formData.enquirerQuery,
      courseName: formData.courseName,
      studentName: formData.studentName,
      enquiryCounter: formData.enquiryCounter,
      followUpDate: formData.followUpDate,
      enquiryIsActive: formData.enquiryIsActive,
    });

    // 2. Register student
    await axios.post("http://localhost:8080/api/student", {
      photoUrl: formData.photoUrl,
      studentGender: formData.studentGender,
      studentDob: formData.studentDob,
      studentQualification: formData.studentQualification,
      batch: { batchId: formData.batchId },
      course: { courseId: formData.courseId },
      enquiry: { enquiryId: formData.enquiryId },
    });

    // 3. Wait a bit and fetch all students
    setTimeout(async () => {
      const res = await axios.get("http://localhost:8080/api/student");
      console.log(res.data);
      const allStudents = res.data;

      // 4. Find the student with the same enquiryId
      const newStudent = allStudents.find(
        (s) => s.enquiry?.enquiryId === formData.enquiryId
      );

      if (newStudent?.studentId) {
        alert("Student Registered Successfully");
        navigate(`/student/${newStudent.studentId}`, {
          state: { studentData: newStudent },
        });
      } else {
        alert("Registration succeeded but Student ID not found");
      }
    }, 1000); // Wait 1 second before fetching students

  } catch (error) {
    alert("Student Registration Failed | Check if Already Registered");
    console.error("Registration error:", error);
  }
};


  return (
    <div className="register-container" ref={formRef}>
      <h2>Register Student from Enquiry</h2>

      <form className="register-form two-column" onSubmit={handleRegister}>
        <input
          type="text"
          name="enquirerName"
          value={formData.enquirerName}
          onChange={handleChange}
          placeholder="Enquirer Name"
          required
        />
        <input
          type="text"
          name="enquirerAddress"
          value={formData.enquirerAddress}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="enquirerMobile"
          value={formData.enquirerMobile}
          onChange={handleChange}
          placeholder="Mobile"
          required
        />
        <input
          type="email"
          name="enquirerEmailId"
          value={formData.enquirerEmailId}
          onChange={handleChange}
          placeholder="Email"
        />

        <select name="courseId" value={formData.courseId} onChange={handleChange}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </select>

        <select name="batchId" value={formData.batchId} onChange={handleChange}>
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch.batchId} value={batch.batchId}>
              {batch.batchName}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Student Name"
        />
        <input
          type="text"
          name="studentGender"
          value={formData.studentGender}
          onChange={handleChange}
          placeholder="Gender"
        />
        <input type="date" name="studentDob" value={formData.studentDob} onChange={handleChange} />
        <input
          type="text"
          name="studentQualification"
          value={formData.studentQualification}
          onChange={handleChange}
          placeholder="Qualification"
        />
        <input
          type="text"
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleChange}
          placeholder="Photo URL"
        />

        <label>
          Active: {" "}
          <input
            type="checkbox"
            name="enquiryIsActive"
            checked={formData.enquiryIsActive}
            onChange={handleChange}
          />
        </label>

        <div className="full-width">
          <button type="submit">Register Student</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
