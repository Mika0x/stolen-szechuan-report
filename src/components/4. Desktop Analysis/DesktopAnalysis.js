import AnalysisQuestion from '../common/AnalysisQuestion';
import desktopOsEvidenceImg from '../assets/evidence/desktop/Desktop_Operating_System.png';
import desktopIPAddressEvidenceImg from '../assets/evidence/desktop/Desktop_Network_Info.png';

function DesktopAnalysis() {
  return (
    <div className="section-content">
      <h3>↠ Desktop Analysis ↞</h3> 
      
      <AnalysisQuestion
        questionNumber={2}
        questionText="What's the Operating System of the Desktop?"
        answerText="Windows 10 Enterprise Evaluation"
        toolsUsed={['Autopsy']}
        artifactsUsed={['Desktop Disk Image']}
        evidenceScreenshots={[
            {src: desktopOsEvidenceImg, label: 'Evidence #1 - Desktop Operating System'}
        ]}
        methodologyText="Using Autopsy's built-in Registry Viewer feature, the analysis began by navigating to the HKEY_LOCAL_MACHINE
        hive and then expanding down through the SOFTWARE\Microsoft\Windows NT keys to select CurrentVersion. Within this key,
        the Product Name value was examined to identify the operating system of the desktop."
        interpretationText="The presence of the 'Windows 10 Enterprise Evaluation' value in the registry confirms the
        operating system version of the compromised workstation involved in the incident."
      />

      <AnalysisQuestion
            questionNumber={9}
            questionText="What was the network layout of the victim network?"
            answerText={
                <>
                Network Address - 10.42.85.0/24<br />
                Desktop IP Address - 10.42.85.115
                </>
            }
            toolsUsed={['Autopsy']}
            artifactsUsed={['Desktop Disk Image']}
            evidenceScreenshots={[
                {src: desktopIPAddressEvidenceImg, label: 'Evidence #9 - Desktop Network Information'}
            ]}
            methodologyText="Using Autopsy's built-in Registry Viewer feature, the analysis began by navigating to the SYSTEM hive from the DC01 Disk Image.
            The path SYSTEM\ControlSet001\Services\Tcpip\Parameters\Interfaces\{InterfaceGUID} was then accessed to select the specific network adapter key
            relevant to the desktop's configuration. Within this key, the values for IPAddress, SubnetMask, and DefaultGateway (if present) were examined
            to help determine the desktop's IP configuration and aspects of the local network layout."
            interpretationText="Analysis of the Desktop's SYSTEM registry hive via Autopsy provided key details about its network configuration,
            which helps define the victim network layout. Evidence #9 shows the network interface configuration for the Desktop Workation.
            The IP Address value is listed as 10.42.85.115, and the SubnetMask is 255.255.255.0. This confirms the Desktop's IP address and indicates
            it resides on a /24 network. This information, combined with previously known details (such as the DC Server IP 10.42.85.10), establishes
            that critical systems are operating within the 10.42.85.0/24 network segment."
        />
    </div>
  );
}

export default DesktopAnalysis;