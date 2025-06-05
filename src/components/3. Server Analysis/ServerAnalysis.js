import AnalysisQuestion from '../common/AnalysisQuestion';
import serverOsEvidenceImg from '../assets/evidence/server/Server_Operating_System.png';
import serverTimeEvidenceImg from '../assets/evidence/server/Server_Local_Time.png';
import serverIPAddressEvidenceImg from '../assets/evidence/server/Server_Network_Info.png';
import serverPsListEvidenceImg from '../assets/evidence/server/Server_Ps_List.png';
import ipAddressPayloadEvidenceImg from '../assets/evidence/server/IP_Address_Payload_Delivery.png';
import serverRemoteAccessEvidenceImg1 from '../assets/evidence/server/Server_Failed_Logons.png';
import serverRemoteAccessEvidenceImg2 from '../assets/evidence/server/Server_Success_Logon.png';
import serverNetStatEvidenceImg from '../assets/evidence/server/Server_Netstat_Info.png';
import malwareLocationEvidenceImg from '../assets/evidence/server/Malware_Location.png';
import malwareVirusTotalEvidenceImg from '../assets/evidence/server/Malware_VirusTotal.png';
import malwareC2VirusTotalEvidenceImg from '../assets/evidence/server/Malware_C2_VirusTotal.png';
import autoRunRegistryEvidenceImg from '../assets/evidence/server/Malware_Autorun_Info.png';
import malFindEvidenceImg from '../assets/evidence/server/Malfind_Evidence.png';
import spoolsvVirusTotalEvidenceImg from '../assets/evidence/server/Spoolsv_VirusTotal.png';

function ServerAnalysis() {
  return (
    <div className="section-content">
      <h3>↠ Server Analysis ↞</h3>
      
      <AnalysisQuestion
            questionNumber={1}
            questionText="What's the Operating System of the Server?"
            answerText="Windows Server 2012 R2 Standard Evaluation"
            toolsUsed={['Autopsy']}
            artifactsUsed={['DC01 Disk Image']}
            evidenceScreenshots={[
                {src: serverOsEvidenceImg, label: 'Evidence #1 - Server Operating System'}
            ]}
            methodologyText="Using Autopsy's built-in Registry Viewer feature, the analysis began by navigating to the HKEY_LOCAL_MACHINE
            hive and then expanding down through the SOFTWARE\Microsoft\Windows NT keys to select CurrentVersion. Within this key,
            the Product Name value was examined to identify the operating system of the server."
            interpretationText="The presence of the 'Windows Server 2012 R2 Standard Evaluation' value in the registry confirms the
            operating system version of the compromised domain controller involved in the incident."
        />

        <AnalysisQuestion
            questionNumber={3}
            questionText="What is the local time zone of the Server?"
            answerText="Pacific Standard Time"
            toolsUsed={['Autopsy']}
            artifactsUsed={['DC01 Disk Image']}
            evidenceScreenshots={[
                {src: serverTimeEvidenceImg, label: 'Evidence #3 - Server Local Time Zone'}
            ]}
            methodologyText="Using Autopsy's built-in Registry Viewer feature, the analysis began by navigating to the HKEY_LOCAL_MACHINE
            hive and then expanding down through the SYSTEM\ControlSet001\Control keys to select TimeZoneInformation. Within this key,
            the TimeZoneKeyName value was examined to identify the local time of the server."
            interpretationText=" The server was set to Pacific Standard Time, which does not match the organization’s expected time zone
            (Mountain Time, UTC-6). This discrepancy could lead to confusion when reviewing logs and correlating event times during the investigation."
        />

        <AnalysisQuestion
            questionNumber={4}
            questionText="Was there a breach?"
            answerText="Yes, a breach definitively occurred as the recipe is confirmed to be stolen."
            toolsUsed={[]}
            artifactsUsed={[]}
            evidenceScreenshots={[]}
            methodologyText="N/A"
            interpretationText="N/A"
        />

        <AnalysisQuestion
            questionNumber={5}
            questionText="What was the initial entry vector?"
            answerText="RDP Brute Force Attack"
            toolsUsed={['Autopsy', 'Windows Event Viewer']}
            artifactsUsed={['DC01 Disk Image']}
            evidenceScreenshots={[
                {src: serverRemoteAccessEvidenceImg1, label: 'Evidence #5.A - Security Log Failed Logon Attempts (Event ID 4625)'},
                {src: serverRemoteAccessEvidenceImg2, label: 'Evidence #5.B - Security Log Successful Logons (Event ID 4624)'}
            ]}
            methodologyText={
                <>
                To determine the initial entry vector, the DC01 disk image was analyzed using Autopsy. The Windows Security event logs (Security.evtx) were reviewed
                through Event Viewer, focusing on logon-related events. Attention was given to Event ID 4625 (failed logon attempts) and Event ID 4624 (successful logons).
                </>
            }
            interpretationText={
                <>
                The repeated failed logon attempts from the workstation named "kali" suggest a brute-force or credential-stuffing attack. The frequency and close timing of
                these attempts indicate automated activity.<br /><br />

                The successful logon occurred two seconds after the last recorded failed logon attempt, under the Administrator account using Logon Type 10 (RemoteInteractive).
                The network information for this event included the source IP address 194.61.24.102, which is not part of the internal 10.42.85.0/24 range, confirming that the
                connection originated from an external machine. <br /><br />

                This pattern indicates that the attacker gained access through Remote Desktop Protocol (RDP) after successfully authenticating with valid credentials.
                </>

            }
        />

        <AnalysisQuestion
            questionNumber={6}
            questionText="Was malware used?"
            answerText={
                <>
                <strong>1. What was malicious?</strong><br />
                coreupdater.exe<br /><br />

                <strong>2. Identify the IP Address that delivered the payload.</strong><br />
                194.61.24.102<br /><br />

                <strong>3. What IP Address is the malware calling to?</strong><br />
                203.78.103.109<br /><br />

                <strong>4. Where is this malware on disk?</strong><br />
                C:\Windows\System32\coreupdater.exe<br /><br />

                <strong>5. When did it first appear?</strong><br />
                Sat, 19 Sep 2020 02:24:06 GMT<br /><br />

                <strong>6. Did someone move it?</strong><br />
                Yes, it was moved to C:\Windows\System32\<br /><br />

                <strong>7. What were the capabilities of this malware?</strong><br />
                Based on the <a href='https://www.joesandbox.com/analysis/398583/0/html#6948EED41B4500E473F97C50C7385EF5E374' target="_blank">Joe Sandbox Analysis</a> of coreupdater.exe, the malware exhibits several capabilities:

                <ol>
                    <li><strong>Reverse Shell Functionality:</strong> The malware is identified as a Metasploit payload, indicating it can establish a reverse shell, allowing remote command execution on the infected system.</li>

                    <li><strong>Persistence Mechanism:</strong> It creates a registry key under HKLM\Software\Microsoft\Windows\CurrentVersion\Run to ensure it runs at startup, maintaining persistence across reboots.</li>
                
                    <li><strong>Network Communication:</strong> The malware communicates with external IP addresses (e.g., 03.78.103.109) to receive commands and exfiltrate data, indicating its ability to operate in a command-and-control (C2) environment.</li>
                    
                    <li><strong>Process Injection:</strong> It injects code into other processes, which can help evade detection by security software and maintain control over the system.</li>

                    <li><strong>Obfuscation:</strong></li> The executable is obfuscated, making it harder for static analysis tools to detect its malicious nature. This is a common technique used by malware authors to evade detection.
                </ol>

                These capabilities suggest that coreupdater.exe is designed for remote access, persistence, and evasion, posing significant risks to compromised systems.<br /><br />

                <strong>8. Is this malware easily obtained?</strong><br />
                Yes, it is part of the Metasploit Framework and can be easily downloaded and used by attackers.<br /><br />

                <strong>9. Was this malware installed with persistence on any machine?</strong><br />
                Yes, the malware was installed with persistence on the DC Server through at least two distinct mechanisms, Registry Run Key and Code Injection.<br />
                </>
            }
            toolsUsed={['Autopsy', 'Volatility', 'Wireshark', 'VirusTotal']}
            artifactsUsed={['DC01 Disk Image', 'DC01 Memory Dump', 'Case001 Packet Capture']}
            evidenceScreenshots={[
                {src: serverPsListEvidenceImg, label: 'Evidence #6.A - Malicious process (coreupdater.exe) in Process List'},
                {src: ipAddressPayloadEvidenceImg, label: 'Evidence #6.B - TCP Stream with IP Address Payload Delivery'},
                {src: serverNetStatEvidenceImg, label: 'Evidence #6.C - Netstat Information of Malicious Connections'},
                {src: malwareLocationEvidenceImg, label: 'Evidence #6.D - Malware (coreupdater.exe) Location on Disk'},
                {src: malwareVirusTotalEvidenceImg, label: 'Evidence #6.E - VirusTotal Analysis of coreupdater.exe'},
                {src: malwareC2VirusTotalEvidenceImg, label: 'Evidence #6.F - VirusTotal Analysis of C2 IP Address'},
                {src: autoRunRegistryEvidenceImg, label: 'Evidence #6.G - Autorun Registry Key for Persistence'},
                {src: malFindEvidenceImg, label: 'Evidence #6.H - Malfind Analysis for Code Injection'},
                {src: spoolsvVirusTotalEvidenceImg, label: 'Evidence #6.I - VirusTotal Analysis of Spoolsv.exe process'}
            ]}
            methodologyText={
                <>
                To identify malicious processes, the Volatility 3 framework was utilized with the windows.pslist plugin on the DC01 memory image. Processes with suspicious names or anomalous creation and exit times were noted for further investigation. <br /> <em><a href="#evidence-image-6-0">(see Evidence #6.A - Malicious process (coreupdater.exe) in Process List)</a></em> <br /><br />
                To identify the IP address that delivered the payload, Wireshark was used to analyze the PCAP data (Case001.PCAP). A display filter (ip.addr == 194.61.24.102 and ip.addr == 10.42.85.10 and tcp.port == 80) was applied to inspect network traffic between the known attacker IP and the DC Server. The TCP stream of suspicious connections was examined for HTTP GET requests and server responses indicative of file downloads. <br /> <em><a href="#evidence-image-6-1">(see Evidence #6.B - TCP Stream with IP Address Payload Delivery)</a></em> <br /><br />
                To determine the IP address the malware was calling to, Volatility 3's windows.netstat plugin was run against the DC01 memory image. The output was reviewed for ESTABLISHED connections made by suspicious processes to external IP addresses. Identified external IPs were then cross-referenced with VirusTotal for reputation. <br /> <em><a href="#evidence-image-6-2">(see Evidence #6.C - Netstat Information of Malicious Connections)</a></em> <br /> <em><a href="#evidence-image-6-5">(see Evidence #6.F - VirusTotal Analysis of C2 IP Address)</a></em><br /><br />
                To find where the malware was located on disk, Autopsy was used to analyze the DC01 Disk Image. The search feature within Autopsy was utilized to look for the filename "coreupdater.exe".  Hash values of suspicious files were extracted and submitted to VirusTotal for further analysis. <br /> <em><a href="#evidence-image-6-3">(see Evidence #6.D - Malware (coreupdater.exe) Location on Disk)</a></em> <br /> <em><a href="#evidence-image-6-4">(see Evidence #6.E - VirusTotal Analysis of coreupdater.exe)</a></em> <br /><br />
                To ascertain when the malware first appeared, the initial Wireshark analysis of the PCAP data was used. Specifically, the HTTP headers within the TCP stream that confirmed the payload delivery of coreupdater.exe were examined for server Date timestamps, indicating the time of transfer. <br /> <em><a href="#evidence-image-6-1">(see Evidence #6.B - TCP Stream with IP Address Payload Delivery)</a></em> <br /><br />
                To determine if the malware was installed with persistence, the DC01 Disk Image was analyzed using Autopsy, and the DC01 memory image was analyzed using Volatility. In Autopsy, common persistence mechanisms, specifically Windows Registry Run keys, were examined by inspecting the SOFTWARE hive (path HKLM\Software\Microsoft\Windows\CurrentVersion\Run) for entries that would automatically start suspicious programs. <br /> <em><a href="#evidence-image-6-6">(see Evidence #6.G - Autorun Registry Key for Persistence)</a></em> <br /><br />
                For memory analysis, Volatility's windows.malfind plugin with the --dump option was run against the DC01 memory image. This was used to identify and extract memory regions within processes, such as spoolsv.exe, that exhibited suspicious characteristics like PAGE_EXECUTE_READWRITE protection and the presence of "MZ" headers or shellcode patterns. The dumped processes identified as suspicious were then uploaded to VirusTotal for further analysis and malware confirmation. The windows.pslist plugin (from prior analysis, Evidence #6.A) was used to confirm that instances of spoolsv.exe were running. <br /> <em><a href="#evidence-image-6-7">(see Evidence #6.H - Malfind Analysis for Code Injection)</a></em> <br /> <em><a href="#evidence-image-6-8">(see Evidence #6.I - VirusTotal Analysis of Spoolsv.exe process)</a></em>
                </>
            }
            interpretationText={
                <>
                The windows.pslist output from Volatility revealed a process named coreupdater.exe (PID 3644) which was deemed suspicious due to its creation and exit occurring in a short timeframe on 2020-09-19 (specifically, 15 seconds apart). This warranted further investigation into its activities. <br /> <em><a href="#evidence-image-6-0">(see Evidence #6.A - Malicious process (coreupdater.exe) in Process List)</a></em> <br /><br />
                Network traffic analysis in Wireshark showed that the DC Server (10.42.85.10) made an HTTP GET request to the IP address 194.61.24.102 for the file /coreupdater.exe. The server at 194.61.24.102 responded with an HTTP 200 OK and served the file, identifying itself as a "SimpleHTTP/0.6 Python/2.7.18" server. The identification of a Python SimpleHTTPServer delivering the executable is suspicious, as such servers are commonly used by adversaries for their simplicity and ease of use in deploying malicious payloads. This confirms that 194.61.24.102 was the IP address that delivered the coreupdater.exe payload to the DC Server. <br /> <em><a href="#evidence-image-6-1">(see Evidence #6.B - TCP Stream with IP Address Payload Delivery)</a></em> <br /><br />
                The windows.netstat output from Volatility showed that the coreupdater.ex process (PID 3644) on the DC Server (10.42.85.10) had an ESTABLISHED TCPv4 connection to the foreign IP address 203.78.103.109 on port 443. VirusTotal analysis of 203.78.103.109 indicated it was flagged for malicious activity by multiple security vendors. This indicates 203.78.103.109 was potentially the C2 server IP the malware was calling to. <br /> <em><a href="#evidence-image-6-2">(see Evidence #6.C - Netstat Information of Malicious Connections)</a></em> <br /> <em><a href="#evidence-image-6-5">(see Evidence #6.F - VirusTotal Analysis of C2 IP Address)</a></em><br /><br />
                Autopsy's analysis of the DC01 disk image, specifically through keyword searches, revealed that coreupdater.exe was located at C:\Windows\System32\coreupdater.exe. The SHA-256 hash of this file, when submitted to VirusTotal, was flagged as malicious by 64 out of 72 security vendors, confirming its malicious nature. <br /> <em><a href="#evidence-image-6-3">(see Evidence #6.D - Malware (coreupdater.exe) Location on Disk)</a></em> <br /> <em><a href="#evidence-image-6-4">(see Evidence #6.E - VirusTotal Analysis of coreupdater.exe)</a></em> <br /><br />
                The Wireshark analysis of the TCP stream for the coreupdater.exe download to the DC Server provided the most direct evidence for when this malware first appeared on that system. The Date header in the HTTP response from 194.61.24.102 was Sat, 19 Sep 2020 02:24:06 GMT. This indicates the time coreupdater.exe was delivered to and first appeared on the DC Server via this specific network transfer. <br /> <em><a href="#evidence-image-6-1">(see Evidence #6.B - TCP Stream with IP Address Payload Delivery)</a></em> <br /><br />
                The coreupdater.exe malware achieved persistence through an entry in the standard HKLM\Software\Microsoft\Windows\CurrentVersion\Run registry key, configured to automatically launch the executabl at startup. <br /> <em><a href="#evidence-image-6-6">(see Evidence #6.G - Autorun Registry Key for Persistence)</a></em> <br /><br />
                The spoolsv.exe process (PID 3724) contained injected malicious PE files and shellcode within its memory. These injected components were confirmed as malicious through VirusTotal analysis, and the compromised spoolsv.exe process was observed running (Evidence #6.A). The Print Spooler (spoolsv.exe) is a standard Windows service that typically starts automatically. By injecting malicious PE files and shellcode into this auto-starting service, the attacker achieved persistence for these malware components. <br /> <em><a href="#evidence-image-6-7">(see Evidence #6.H - Malfind Analysis for Code Injection)</a></em> <br /> <em><a href="#evidence-image-6-8">(see Evidence #6.I - VirusTotal Analysis of Spoolsv.exe process)</a></em>
                </>
            }
        />

        <AnalysisQuestion
            questionNumber={7}
            questionText="What malicious IP Addresses were involved?"
            answerText="194.61.24.102 and 203.78.103.109"
            toolsUsed={[]}
            artifactsUsed={[]}
            evidenceScreenshots={[]}
            methodologyText=""
            interpretationText=""
        />

        <AnalysisQuestion
            questionNumber={8}
            questionText="Did the attacker access any other systems?"
            answerText="Yes, the attacker was able to gain access to DESKTOP-SDN1RPT by utilizing Remote Desktop Protocol (RDP) from the Domain Controller while using the Administrator account."
            toolsUsed={[]}
            artifactsUsed={[]}
            evidenceScreenshots={[]}
            methodologyText=""
            interpretationText=""
        />

        <AnalysisQuestion
            questionNumber={9}
            questionText="What was the network layout of the victim network?"
            answerText={
                <>
                Network Address - 10.42.85.0/24<br />
                Domain Controller IP Address - 10.42.85.10
                </>
            }
            toolsUsed={['Autopsy']}
            artifactsUsed={['DC01 Disk Image']}
            evidenceScreenshots={[
                {src: serverIPAddressEvidenceImg, label: 'Evidence #9 - Domain Controller Network Information'}
            ]}
            methodologyText="Using Autopsy's built-in Registry Viewer feature, the analysis began by navigating to the SYSTEM hive from the DC01 Disk Image.
            The path SYSTEM\ControlSet001\Services\Tcpip\Parameters\Interfaces\{InterfaceGUID} was then accessed to select the specific network adapter key
            relevant to the DC Server's configuration. Within this key, the values for IPAddress, SubnetMask, and DefaultGateway (if present) were examined
            to help determine the server's IP configuration and aspects of the local network layout."
            interpretationText="Analysis of the DC Server's SYSTEM registry hive via Autopsy provided key details about its network configuration,
            which helps define the victim network layout. Evidence #9 shows the network interface configuration for the Domain Controller (DC01).
            The IP Address value is listed as 10.42.85.10, and the SubnetMask is 255.255.255.0. This confirms the DC Server's IP address and indicates
            it resides on a /24 network. This information, combined with previously known details (such as the Desktop IP 10.42.85.115), establishes
            that critical systems are operating within the 10.42.85.0/24 network segment."
        />

        <AnalysisQuestion
            questionNumber={11}
            questionText="Did the attacker steal the Szechuan sauce? If so, what time?"
            answerText=""
            toolsUsed={[]}
            artifactsUsed={[]}
            evidenceScreenshots={[]}
            methodologyText=""
            interpretationText=""
        />

        <AnalysisQuestion
            questionNumber={12}
            questionText="Did the attacker steal or access any other sensitive files? If so, what times?"
            answerText=""
            toolsUsed={[]}
            artifactsUsed={[]}
            evidenceScreenshots={[]}
            methodologyText=""
            interpretationText=""
        />

        <AnalysisQuestion
            questionNumber={13}
            questionText="Finally, when was the last known contact with the adversary?"
            answerText=""
            toolsUsed={[]}
            artifactsUsed={[]}
            evidenceScreenshots={[]}
            methodologyText=""
            interpretationText=""
        />

    </div>
  );
}

export default ServerAnalysis;