import './DesktopAnalysis.css'; // We'll create a generic CSS for sections
import AnalysisQuestion from '../common/AnalysisQuestion';
import desktopOsEvidenceImg from '../assets/evidence/desktop/Desktop_Operating_System.png';

function DesktopAnalysis() {
  const desktopOsEvidence = (
    <div>
      <img src={desktopOsEvidenceImg} alt="Evidence for Desktop OS" />
    </div>
  );



  return (
    <div className="section-content">
      <h3>Desktop Analysis 🔎</h3> 
      
      <AnalysisQuestion
        questionNumber="1"
        questionText="What's the Operating System of the Desktop?" // [cite: 12]
        findingText="Windows 10 Enterprise Evaluation" // [cite: 13]
        methodologyText="Using Autopsy's built-in Registry Viewer feature, the analysis began by navigating to the HKEY_LOCAL_MACHINE hive and then expanding down through the SOFTWARE\Microsoft\Windows NT keys to select CurrentVersion. Within this key, the Product Name value was examined to identify the operating system of the desktop." // [cite: 13, 14]
        evidenceContent={desktopOsEvidence}
      />

      {/* Add more AnalysisQuestion components for other questions */}
    </div>
  );
}

export default DesktopAnalysis;