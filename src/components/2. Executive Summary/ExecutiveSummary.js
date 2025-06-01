import React from 'react';
import './ExecutiveSummary.css'; // We'll create a generic CSS for sections

function ExecutiveSummary() {
  return (
    <div className="section-content">
      <h3>Executive Summary 📜</h3>
      <p>
        This report details the investigation into the alleged unauthorized access
        and theft of the proprietary Szechuan Sauce recipe from Rick's Innovations Inc.
        The incident, codenamed "The Case of the Stolen Szechuan Sauce," was reported
        on [Date of Report].
      </p>
      <p>
        Our forensic analysis focused on server logs, employee workstations, and network
        traffic to identify the point of compromise, the data exfiltrated, and the
        potential perpetrator(s). This summary provides an overview of our findings,
        methodology, and key conclusions.
      </p>
      <h4>Key Findings:</h4>
      <ul>
        <li>Evidence of unauthorized access to the main recipe server was discovered.</li>
        <li>Specific log entries indicate file access corresponding to the Szechuan Sauce recipe documents.</li>
        <li>A compromised employee account appears to be the initial vector of attack.</li>
      </ul>
      <p>
        Further details on the analysis of each system and the timeline of events
        are presented in the subsequent sections of this report.
      </p>
  
    </div>
  );
}

export default ExecutiveSummary;