import React from "react";
import { useNavigate } from "react-router-dom";
import "./ManageWebsiteData.css";

const ManageWebsiteData = () => {
  const navigate = useNavigate();

  const sections = [
    { name: "Courses", route: "/add-course", icon: "📘" },
    { name: "Marquee", route: "/add-marquee", icon: "📢" },
    { name: "Campus Life", route: "/add-campus-life", icon: "🏫" },
    { name: "Faculty", route: "/add-faculty", icon: "👩‍🏫" },
    { name: "Batchwise Placement", route: "/add-batch-placement", icon: "🎓" },
    { name: "Recruiters", route: "/manage-recruiter", icon: "🏢" },
  ];

  return (
    <div className="manage-data">
      <h1 className="page-title">🚀 Manage Website Data</h1>
      <div className="button-grid">
        {sections.map((section) => (
          <button
            key={section.name}
            className="section-button"
            onClick={() => navigate(section.route)}
          >
            <i>{section.icon}</i> Add {section.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageWebsiteData;
