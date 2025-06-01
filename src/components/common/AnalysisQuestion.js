import React from 'react';
import './AnalysisQuestion.css'; // We'll create this CSS file next

function AnalysisQuestion({ questionNumber, questionText, findingText, methodologyText, evidenceContent }) {
  return (
    <div className="analysis-question-container">
      <h4>{questionNumber ? `Question #${questionNumber}: ` : 'Question: '}{questionText}</h4>
      
      <div className="detail-block">
        <strong className="detail-label">Finding:</strong>
        <div className="detail-content finding-content">{findingText}</div>
      </div>
      
      <div className="detail-block">
        <strong className="detail-label">Methodology:</strong>
        <div className="detail-content methodology-content">{methodologyText}</div>
      </div>
      
      {evidenceContent && (
        <div className="detail-block">
          <strong className="detail-label">Evidence:</strong>
          <div className="detail-content evidence-content">{evidenceContent}</div>
        </div>
      )}
    </div>
  );
}

export default AnalysisQuestion;