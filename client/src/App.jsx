import { useState } from 'react';
import LiveMonitoring from './components/LiveMonitoring';
import Alerts from './components/Alerts';
import Logs from './components/Logs';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const menuItems = ['Dashboard', 'Live Monitoring', 'Alerts', 'Logs'];

  return (
    <div className="flex h-screen bg-[#0d0f14] text-slate-50 overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute rounded-full blur-[140px] z-0 opacity-40 pointer-events-none w-[600px] h-[600px] bg-blue-500/30 -top-[200px] -left-[200px]"></div>
      <div className="absolute rounded-full blur-[140px] z-0 opacity-40 pointer-events-none w-[500px] h-[500px] bg-purple-500/20 -bottom-[200px] -right-[100px]"></div>
      
      {/* Left Sidebar */}
      <aside className="w-72 flex-shrink-0 z-20 border-r border-white/5 bg-[#151821]/80 backdrop-blur-xl flex flex-col p-6">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6 px-4">Menu</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item}>
                <button 
                  onClick={() => setActiveTab(item)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${
                    activeTab === item 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto border-t border-white/5 pt-6">
          <div className="flex items-center gap-3 px-4 text-sm font-medium text-slate-400 bg-white/5 py-3 rounded-xl border border-white/5">
            <div className="relative w-2 h-2 flex items-center justify-center">
              <div className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-2 h-2 rounded-full bg-emerald-500"></div>
            </div>
            System Online
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col z-10 w-full overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-24 flex-shrink-0 border-b border-white/5 bg-[#151821]/60 backdrop-blur-md flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 flex justify-center items-center mr-2">
              <div className="absolute w-full h-full border-2 border-blue-500/50 rounded-full animate-ripple"></div>
              <div className="absolute w-10 h-10 border border-blue-400/30 rounded-full animate-ripple [animation-delay:-1s]"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full z-20 shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white m-0">
              Blurnet
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors relative w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center">
              <span className="text-xl">🔔</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#151821]"></span>
            </button>
            <div className="w-10 h-10 rounded-full border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-sm font-bold text-white shadow-sm cursor-pointer hover:border-white/20 transition-colors">
              VC
            </div>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-10 lg:p-12 relative">
          
          <div className="max-w-7xl mx-auto flex flex-col gap-12 h-full">
            
            {activeTab === 'Dashboard' && (
              <>
                {/* Welcome Text */}
                <div className="animate-fade-in-up">
                  <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">Welcome back, Admin 👋</h2>
                  <p className="text-xl text-slate-400 font-medium">Here's what is happening with your safety monitoring system today.</p>
                </div>

                {/* 3 Cards Area */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up [animation-delay:200ms] [animation-fill-mode:both]">
                  
                  {/* Card 1: Active Cameras */}
                  <div className="bg-[#151821]/60 border border-white/5 rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#1c202b]/80 hover:border-white/10 hover:shadow-xl hover:shadow-blue-500/5 group flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg text-slate-400 font-semibold m-0 tracking-wide">Active Cameras</h3>
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                          📹
                        </div>
                      </div>
                      <div className="text-6xl font-bold text-slate-50 mb-6 leading-none tracking-tighter">142</div>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-emerald-500">
                      <span className="bg-emerald-500/10 px-2.5 py-1 rounded-md text-emerald-400 border border-emerald-500/20">+3</span>
                      <span className="text-slate-500 font-medium">since last check</span>
                    </div>
                  </div>

                  {/* Card 2: Alerts Today */}
                  <div className="bg-[#151821]/60 border border-white/5 rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#1c202b]/80 hover:border-white/10 hover:shadow-xl hover:shadow-red-500/5 group flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg text-slate-400 font-semibold m-0 tracking-wide">Alerts Today</h3>
                        <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500/20 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                          ⚠️
                        </div>
                      </div>
                      <div className="text-6xl font-bold text-slate-50 mb-6 leading-none tracking-tighter">24</div>
                    </div>
                    <div className="relative z-10 flex items-center gap-3 text-sm font-semibold text-red-500">
                      <span className="bg-red-500/10 px-2.5 py-1 rounded-md text-red-400 border border-red-500/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> High severity
                      </span>
                      <span className="text-slate-500 font-medium">action required</span>
                    </div>
                  </div>

                  {/* Card 3: System Status */}
                  <div className="bg-[#151821]/60 border border-white/5 rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#1c202b]/80 hover:border-white/10 hover:shadow-xl hover:shadow-emerald-500/5 group flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg text-slate-400 font-semibold m-0 tracking-wide">System Status</h3>
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                          ⚡
                        </div>
                      </div>
                      <div className="text-3xl lg:text-4xl font-bold text-slate-50 mb-6 tracking-tight flex items-center gap-3.5 h-[60px]">
                        <span className="relative flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 outline outline-4 outline-emerald-500/20"></span>
                        </span>
                        <span className="bg-gradient-to-br from-emerald-100 to-emerald-400 bg-clip-text text-transparent">Operational</span>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center gap-3 text-sm font-medium text-slate-400 border-t border-white/5 pt-4 mt-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500">Latency</span>
                        <span className="text-slate-200">24ms</span>
                      </div>
                      <div className="w-[1px] h-8 bg-white/10 mx-2"></div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500">Uptime</span>
                        <span className="text-slate-200">99.99%</span>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )}

            {activeTab === 'Live Monitoring' && (
              <LiveMonitoring />
            )}

            {activeTab === 'Alerts' && (
              <Alerts />
            )}

            {activeTab === 'Logs' && (
              <Logs />
            )}

          </div>
        </main>
      </div>
    </div>
  )
}

export default App
