import Home from './pages/Home';
import Header from './components/Header';
import Navbar from './components/Navbar';
import NotificationBar from './components/NotificationBar';
import Footer from './components/Footer';
import BatchwisePlacement from './pages/BatchwisePlacement';
import AddCourse from './pages/AddCourse';
import Courses from "./pages/Courses";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import ManageWebsiteData from "./pages/ManageWebsiteData";
import BatchwisePlacedStudents from "./pages/BatchwisePlacedStudents";
import AddBatchPlacement from "./pages/AddBatchPlacement";
import EditBatchwisePlacedStudents from './pages/EditBatchwisePlacedStudents';
import AddMarquee from './pages/AddMarquee';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Recruiter from './pages/Recruiter';
import ManageRecruiter from './pages/ManageRecruiter';
import ManageStaff from './pages/ManageStaff';
import ManageEnquiry from './pages/ManageEnquiry';
import Register from './pages/Register';
import GetInTouch from './pages/Getintouch';
import PaymentPage from './pages/PaymentPage';
import ReceiptPage from './pages/ReceiptPage';

import CampusLife from './pages/CampusLife';
import Campus from './pages/Campus';

import AddFaculty from './pages/AddFaculty';
import FacultyList from './pages/FacultyList';

import Student from './pages/Student';
import ScrollToTopButton from './components/ScrollToTopButton'; // attractive button

const App = () => {
  return (
    <>
      <Header />
      <Navbar />
      <NotificationBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/placement" element={<BatchwisePlacement />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/recruiters" element={<Recruiter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/batchwise-placed-students/:batchId" element={<BatchwisePlacedStudents />} />
        <Route path="/campuslife" element={<Campus />} />
        <Route path="/add-faculty" element={<AddFaculty />} />
        <Route path="/faculty" element={<FacultyList />} />
        <Route path="/Getintouch" element={<GetInTouch />} />

        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/manage-data" element={<ProtectedRoute><ManageWebsiteData /></ProtectedRoute>} />
        <Route path="/manage-enquiry" element={<ProtectedRoute><ManageEnquiry /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/student/:studentId" element={<ProtectedRoute><Student /></ProtectedRoute>} />
        <Route path="/payments/:studentId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/receipt/:receiptId" element={<ProtectedRoute><ReceiptPage /></ProtectedRoute>} />
        <Route path="/manage-staff" element={<ProtectedRoute><ManageStaff /></ProtectedRoute>} />
        <Route path="/add-course" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
        <Route path="/add-batch-placement" element={<ProtectedRoute><AddBatchPlacement /></ProtectedRoute>} />
        <Route path="/add-marquee" element={<ProtectedRoute><AddMarquee /></ProtectedRoute>} />
        <Route path="/manage-recruiter" element={<ProtectedRoute><ManageRecruiter /></ProtectedRoute>} />
        <Route path="/edit-batchwise-placed-students/:batchId" element={<ProtectedRoute><EditBatchwisePlacedStudents /></ProtectedRoute>} />
        <Route path="/add-campus-life" element={<ProtectedRoute><CampusLife /></ProtectedRoute>} />
      </Routes>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default App;
