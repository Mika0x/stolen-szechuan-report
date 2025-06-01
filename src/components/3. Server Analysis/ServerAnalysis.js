import React from 'react';
import './ServerAnalysis.css'; // We'll create a generic CSS for sections
import AnalysisQuestion from '../common/AnalysisQuestion';
import serverOsEvidenceImg from '../assets/evidence/server/Server_Operating_System.png';
import serverTimeEvidenceImg from '../assets/evidence/server/Server_Local_Time.png';
import serverIPAddressEvidenceImg from '../assets/evidence/server/Server_Network_Info.png';

function ServerAnalysis() {
  const serverOsEvidence = (
    <div>
      <img src={serverOsEvidenceImg} alt="Evidence for Server OS" />
    </div>
  );

  const serverTimeEvidence = (
    <div>
      <img src={serverTimeEvidenceImg} alt="Evidence for Server Timezone" />
    </div>
  );

  const serverIPAddressEvidence = (
    <div>
        <img src={serverIPAddressEvidenceImg} alt="Evidence for Server IP Address" />
    </div>
  );

  const findingForQuestion9 = (
  <div>
    <p>Network Address - 10.42.85.0/24</p>
    <p>Domain Controller IP Address - 10.42.85.10</p>
  </div>
);

  return (
    <div className="section-content">
      <h3>Server Analysis 🔎</h3>
      
      <AnalysisQuestion
        questionNumber="1"
        questionText="What's the Operating System of the Server?" 
        findingText="Windows Server 2012 R2 Standard Evaluation" 
        methodologyText="Using Autopsy's built-in Registry Viewer feature, the analysis began by navigating to the HKEY_LOCAL_MACHINE 
        hive and then expanding down through the SOFTWARE\Microsoft\Windows NT keys to select CurrentVersion. Within this key,
        the Product Name value was examined to identify the operating system of the server." 
        evidenceContent={serverOsEvidence}
      />
      
      <AnalysisQuestion
        questionNumber="3"
        questionText="What is the local time zone of the Server?" 
        findingText="Pacific Standard Time" 
        methodologyText="Using Autopsy's built-in Registry Viewer feature, the analysis began by navigating to the HKEY_LOCAL_MACHINE 
        hive and then expanding down through the SYSTEM\ControlSet001\Control keys to select TimeZoneInformation. Within this key,
        the TimeZoneKeyName value was examined to identify the local time of the server." 
        evidenceContent={serverTimeEvidence}
      />

      <AnalysisQuestion
        questionNumber="4"
        questionText="Was there a breach?" 
        findingText="Yes, there was a breach." 
        methodologyText=""
        evidenceContent=""
      />

      <AnalysisQuestion
        questionNumber="5"
        questionText="What was the initial entry vector (how did they get in)?" 
        findingText=""
        methodologyText=""
        evidenceContent=""
      />

      <AnalysisQuestion
        questionNumber="6"
        questionText=" Was malware used? If so, what was it?" 
        findingText=""
        methodologyText=""
        evidenceContent=""
      />

      <AnalysisQuestion
        questionNumber="7"
        questionText="What malicious IP Addresses were involved?" 
        findingText=""
        methodologyText=""
        evidenceContent=""
      />

      <AnalysisQuestion
        questionNumber="8"
        questionText="Did the attacker access any other systems?" 
        findingText=""
        methodologyText=""
        evidenceContent=""
      />

      <AnalysisQuestion
        questionNumber="9"
        questionText="What was the network layout of the victim network?" 
        findingText={findingForQuestion9}
        methodologyText="Using Autopsy's built-in Registry Viewer feature, the analysis began by navigating to the HKEY_LOCAL_MACHINE 
        hive and then expanding down through the SYSTEM\ControlSet001\Services\Tcpip\Parameters\ keys to select the specific Network Adapter key. Within this key,
        the IPAddress value was examined to identify the local time of the server."
        evidenceContent={serverIPAddressEvidence} 
      />

      <AnalysisQuestion
        questionNumber="11"
        questionText="Did the attacker steal the Szechuan sauce? If so, what time?" 
        findingText=""
        methodologyText=""
        evidenceContent=""
      />

      <AnalysisQuestion
        questionNumber="12"
        questionText="Did the attacker steal or access any other sensitive files? If so, what times?" 
        findingText=""
        methodologyText=""
        evidenceContent=""
      />

      <AnalysisQuestion
        questionNumber="13"
        questionText="Finally, when was the last known contact with the adversary?" 
        findingText=""
        methodologyText=""
        evidenceContent=""
      />

      {/* Add more AnalysisQuestion components for other questions */}
    </div>
  );
}

export default ServerAnalysis;