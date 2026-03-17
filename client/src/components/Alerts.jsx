const Alerts = () => {
  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      type: "Unauthorized Model Access Attempt",
      source: "IP 192.168.1.45",
      timestamp: "Just now",
      status: "Active",
      severity: "high"
    },
    {
      id: 2,
      type: "High Latency Detected in Node 3",
      source: "Response time > 500ms",
      timestamp: "2m ago",
      status: "Active",
      severity: "medium"
    },
    {
      id: 3,
      type: "Unusual Data Exfiltration Pattern",
      source: "User ID 8943",
      timestamp: "10m ago",
      status: "Active",
      severity: "high"
    },
    {
      id: 4,
      type: "API Rate Limit Exceeded",
      source: "Token ending in ...4f2a",
      timestamp: "1h ago",
      status: "Resolved",
      severity: "low"
    },
    {
      id: 5,
      type: "Routine Health Check Failed",
      source: "Database Connection Timeout",
      timestamp: "3h ago",
      status: "Resolved",
      severity: "medium"
    }
  ];

  return (
    <div className="w-full animate-fade-in-up [animation-duration:500ms]">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Security Alerts</h2>
        <p className="text-slate-400">Manage and monitor system anomalies in real-time.</p>
      </div>

      <div className="flex flex-col gap-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`relative overflow-hidden bg-[#151821]/60 border rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              alert.status === 'Active' 
                ? 'border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/10' 
                : 'border-white/5 hover:border-white/10 hover:bg-[#1c202b]/80'
            }`}
          >
            {/* Background Glow for Active Alerts */}
            {alert.status === 'Active' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors duration-500 pointer-events-none"></div>
            )}
            
            <div className="flex items-start md:items-center gap-5 relative z-10 w-full md:w-auto">
              <div className="mt-1 md:mt-0 flex-shrink-0">
                {alert.status === 'Active' ? (
                  <div className="relative w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <span className="text-red-400 text-lg">⚠️</span>
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#151821] animate-pulse"></span>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <span className="text-emerald-400 text-lg">✅</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`text-lg font-semibold truncate mb-1 ${alert.status === 'Active' ? 'text-red-50' : 'text-slate-50'}`}>
                  {alert.type}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-slate-400 font-medium">{alert.source}</span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full hidden sm:block"></span>
                  <span className="text-slate-500 flex items-center gap-1.5">
                    ⏱️ {alert.timestamp}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 relative z-10 w-full md:w-auto mt-2 md:mt-0 pl-15 md:pl-0 border-t border-white/5 md:border-0 pt-3 md:pt-0">
               {/* Status Badge */}
               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                  alert.status === 'Active' 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
               }`}>
                  {alert.status === 'Active' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-blink"></span>}
                  {alert.status}
               </span>
               
               {/* Action Button for Active Alerts */}
               {alert.status === 'Active' && (
                 <button className="px-4 py-2 bg-[#1c202b] hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-lg text-sm font-medium transition-all duration-200 ml-auto md:ml-2">
                   Resolve
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
