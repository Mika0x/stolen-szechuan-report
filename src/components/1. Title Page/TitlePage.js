import React from 'react';
import './TitlePage.css';
import logoImage from '../assets/Logo.png'; 

function TitlePage() {
  return (
    <div className="title-page-container">
      <div className="title-page-content">
        <img src={logoImage} alt="Company Logo" className="logo-image" />

        <h1 className="main-title">Digital Forensics Investigation Report</h1>
        <h2 className="sub-title">The Stolen Szechuan Sauce</h2>
        <p className="examiner">Mika Gellizeau</p>
        <p className="date">2025-06-02</p>
      </div>
    </div>
  );
}

export default TitlePage;
