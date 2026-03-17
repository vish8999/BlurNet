const Logs = () => {
  // Generate a realistic list of system logs
  const logs = [
    { id: 101, time: "10:45:22", event: "Node 1 connection established", status: "Success", type: "system" },
    { id: 102, time: "10:45:15", event: "Camera Feed 43 initialization", status: "Success", type: "camera" },
    { id: 103, time: "10:42:01", event: "Failed login attempt from IP 192.168.1.10", status: "Warning", type: "auth" },
    { id: 104, time: "10:40:55", event: "Database backup completed", status: "Success", type: "system" },
    { id: 105, time: "10:35:12", event: "Model inference latency > 500ms detected", status: "Warning", type: "ai" },
    { id: 106, time: "10:30:00", event: "Scheduled vulnerability scan started", status: "Info", type: "security" },
    { id: 107, time: "10:28:44", event: "User 'admin' logged in", status: "Success", type: "auth" },
    { id: 108, time: "10:15:33", event: "API Rate limit exceeded for source IP 10.0.0.5", status: "Error", type: "network" },
    { id: 109, time: "10:05:11", event: "New firmware deployed to Edge Node 3", status: "Success", type: "system" },
    { id: 110, time: "09:59:05", event: "Unrecognized object detected on Feed 12", status: "Warning", type: "ai" },
    { id: 111, time: "09:45:22", event: "System reboot initiated by user 'root'", status: "Info", type: "system" },
    { id: 112, time: "09:40:15", event: "Camera Feed 12 offline (connection lost)", status: "Error", type: "camera" },
    { id: 113, time: "09:30:01", event: "Daily report generated and emailed", status: "Success", type: "system" },
    { id: 114, time: "09:15:55", event: "SSL certificate renewal successful", status: "Success", type: "security" },
    { id: 115, time: "09:05:12", event: "High memory usage on Worker Node 2 (95%)", status: "Warning", type: "system" },
    { id: 116, time: "08:30:00", event: "Routine diagnostic check passed", status: "Success", type: "system" }
  ];

  // Helper function to get status styling
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Success':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Warning':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Error':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Info':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="w-full h-full flex flex-col animate-fade-in-up [animation-duration:500ms]">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">System Logs</h2>
          <p className="text-slate-400">Chronological record of all system events and operations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#1c202b] hover:bg-white/10 text-slate-300 border border-white/10 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm flex items-center gap-2">
            <span>⬇️</span> Export
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            Refresh
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 bg-[#151821]/60 border border-white/5 rounded-2xl backdrop-blur-xl overflow-hidden flex flex-col shadow-xl">
        
        {/* Table Header (Fixed) */}
        <div className="grid grid-cols-[120px_1fr_120px] gap-4 p-4 border-b border-white/10 bg-[#1c202b]/80 text-xs font-semibold text-slate-400 uppercase tracking-wider sticky top-0 z-10">
          <div className="px-2">Time</div>
          <div>Event Details</div>
          <div className="text-center">Status</div>
        </div>
        
        {/* Scrollable Table Body */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="flex flex-col gap-1">
            {logs.map((log, index) => (
              <div 
                key={log.id} 
                className={`grid grid-cols-[120px_1fr_120px] gap-4 p-3 items-center rounded-xl transition-colors duration-200 border border-transparent ${
                  index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                } hover:bg-white/5 hover:border-white/5`}
              >
                <div className="text-sm font-mono text-slate-400 px-2">
                  {log.time}
                </div>
                
                <div className="text-sm text-slate-200 pr-4">
                  {log.event}
                </div>
                
                <div className="flex justify-center">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getStatusStyle(log.status)}`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer info */}
        <div className="p-4 border-t border-white/10 bg-[#1c202b]/40 flex justify-between items-center text-xs text-slate-500">
           <span>Showing 16 most recent events</span>
           <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 blink-animation"></span> Live sync active</span>
        </div>
      </div>
    </div>
  );
};

export default Logs;
