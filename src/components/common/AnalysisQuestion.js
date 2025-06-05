import './AnalysisQuestion.css';

function AnalysisQuestion({
  questionNumber,
  questionText,
  answerText,
  toolsUsed,
  artifactsUsed,
  evidenceScreenshots = [],
  methodologyText,
  interpretationText
}) {
  return (
    <div className="analysis-question-container">
      <h4>
        {questionNumber ? `🟩 Question #${questionNumber}: ` : 'Question: '}
        {questionText}
      </h4>

      <div className="detail-block">
        <strong className="detail-label">Answer:</strong>
        <div className="detail-content answer-content">{answerText}</div>
      </div>

      <div className="detail-block">
        <strong className="detail-label">Tools and Artifacts Used:</strong>
        <div className="detail-content tools-content">
          <ul>
            {toolsUsed?.map((tool, index) => (
              <li key={`tool-${index}`}><strong>Tool:</strong> {tool}</li>
            ))}
            {artifactsUsed?.map((artifact, index) => (
              <li key={`artifact-${index}`}><strong>Artifact:</strong> {artifact}</li>
            ))}
          </ul>
        </div>
      </div>

      {evidenceScreenshots.length > 0 && (
        <div className="detail-block">
          <strong className="detail-label">Evidence List:</strong>
          <div className="detail-content evidence-content">
            {evidenceScreenshots.map((evidence, idx) => {
              // Create a unique ID for each image
              const imageId = `evidence-image-${questionNumber}-${idx}`; // Or some other unique prefix + index

              return (
                <div className="evidence-item" key={`evidence-${idx}`}>
                  <div id={imageId}  className="evidence-label">{evidence.label || `Evidence #${idx + 1}`}</div>
                  <img 
                    src={evidence.src} 
                    alt={evidence.label || `Evidence ${idx + 1}`} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}


      <div className="detail-block">
        <strong className="detail-label">Methodology:</strong>
        <div className="detail-content methodology-content" >{methodologyText}</div>
      </div>

      <div className="detail-block">
        <strong className="detail-label">Interpretation:</strong>
        <div className="detail-content interpretation-content">{interpretationText}</div>
      </div>
    </div>
  );
}

export default AnalysisQuestion;
