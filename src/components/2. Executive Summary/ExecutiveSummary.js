
function ExecutiveSummary() {
  return (
    <div className="executive section-content">
      <h3>↠ Executive Summary ↞</h3>
      <p>
        This report provides the results of an investigation into the "Case of the Stolen Szechuan Sauce". A security incident was examined to understand if company information had been accessed without permission and,
        if so, to determine how the attackers operated. The investigation confirmed that a serious security breach did occur. As a result, important company systems were broken into, and the company's secret
        Szechuan sauce recipe was stolen.
      </p>
      <p>
        The attackers first gained entry into the company's computer systems by repeatedly trying to guess the password for remote access to the main company computer (the server). This server utilized an
        operating system called Windows Server 2012 R2 Standard Evaluation and was set to Pacific Standard Time, a deviation from the company's standard time zone. Another computer implicated in this incident
        was a workstation running Windows 10 Enterprise Evaluation.
      </p>
      <p>
        After obtaining unauthorized access, the attackers installed harmful software on the server. This malicious program was identified as coreupdater.exe. It was dispatched from a specific attacker-controlled
        internet address (194.61.24.102) and was discovered hidden within a system folder on the server, where it had been relocated by the attackers. This malware first manifested on Saturday, September 19, 2020,
        at 02:24:06 GMT. It was also found to be covertly sending and receiving instructions from another computer controlled by the attackers at a different internet address (203.78.103.109).
      </p>
      <p>
        Further analysis revealed that this malware, coreupdater.exe, is a common tool employed by hackers and is relatively easy for them to acquire. It possessed several dangerous capabilities:
        it enabled attackers to control the server remotely, it could communicate with the attackers' computers, it was able to hide itself within normal computer operations to avoid detection, and it was
        disguised to appear as a harmless file. Most significantly, this malware was configured to remain active on the main company computer (the Domain Controller Server) for an extended period.
        The attackers ensured this persistence by setting the malware to start automatically every time the server was turned on by adding parts of itself within Windows system settings.
      </p>
      <p className="tools-used">
        Key tools utilized in this investigation included <a href="https://www.autopsy.com/" target="_blank">Autopsy</a> for detailed forensic examination of disk images, <a href="https://volatilityfoundation.org/the-volatility-framework/" target="_blank">Volatility</a> for in-depth analysis of system memory dumps, <a href="https://www.wireshark.org/" target="_blank">Wireshark</a> for inspecting network traffic, and <a href="https://www.virustotal.com/gui/home/upload" target="_blank">VirusTotal</a> for identifying known malicious files and URLs.
      </p>
  
    </div>
  );
}

export default ExecutiveSummary;