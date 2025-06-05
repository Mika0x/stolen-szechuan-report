import React, { useState } from 'react';
import './App.css';
import ExecutiveSummary from './2. Executive Summary/ExecutiveSummary';
import TitlePage from './1. Title Page/TitlePage';
import ServerAnalysis from './3. Server Analysis/ServerAnalysis';
import DesktopAnalysis from './4. Desktop Analysis/DesktopAnalysis';
import Conclusion from './5. Conclusion/Conclusion';
import References from './6. References/References';

function App() {
  const [activeSection, setActiveSection] = useState('Title Page');

  const sections = [
    'Title Page',
    'Executive Summary',
    'Server Analysis',
    'Desktop Analysis',
    'Conclusion',
    'References'
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'Title Page':
        return <TitlePage />;
      case 'Executive Summary':
        return <ExecutiveSummary />;
       case 'Server Analysis':
         return <ServerAnalysis />;
      case 'Desktop Analysis':
         return <DesktopAnalysis />;
      case 'Conclusion':
         return <Conclusion />;
      case 'References':
        return <References />
      default:
        return <div className="content-placeholder">Select a section to view its content.</div>;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>The Stolen Szechuan Sauce Recipe</h1>
        <h2>Digital Forensics Report 🔎</h2>
      </header>
      <nav className="navbar">
        {sections.map((section) => (
          <button
            key={section}
            className={`nav-button ${activeSection === section ? 'active' : ''}`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </nav>
      <main className="content-area">
        {renderSection()}
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 by Mika Gellizeau. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;