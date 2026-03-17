import { useRef, useState, useEffect } from 'react';

const LiveMonitoring = () => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
      setError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check your browser permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  // Cleanup to stop the camera when navigating away from the component
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-6 animate-fade-in-up [animation-duration:500ms]">
      
      <div className="flex justify-between items-center bg-[#151821]/60 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Live Camera Feed</h2>
          <p className="text-sm text-slate-400">Real-time surveillance monitoring from the browser</p>
        </div>
        
        <div className="flex gap-4 items-center">
          {isCameraOn && (
            <span className="bg-red-500/10 text-red-500 py-1.5 px-3.5 rounded-full text-sm font-semibold flex items-center gap-2 border border-red-500/20 mr-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-blink flex-shrink-0"></span>
              LIVE
            </span>
          )}
          <button 
            onClick={startCamera}
            disabled={isCameraOn}
            className="px-5 py-2.5 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/20"
          >
            Start Camera
          </button>
          <button 
            onClick={stopCamera}
            disabled={!isCameraOn}
            className="px-5 py-2.5 rounded-xl font-semibold text-white bg-[#1c202b] hover:bg-red-500 hover:text-white border border-white/10 hover:border-red-500 focus:ring-4 focus:ring-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1c202b] disabled:hover:border-white/10 transition-all duration-200"
          >
            Stop Camera
          </button>
        </div>
      </div>

      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium animate-fade-in-up flex items-center gap-3">
          <span className="text-xl">⚠️</span> {error}
        </div>
      )}

      <div className="flex-1 bg-[#151821]/60 border border-white/5 rounded-3xl backdrop-blur-xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group min-h-[500px]">
        {/* Glow effect behind video */}
        {isCameraOn && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000"></div>
        )}

        <div className={`w-full max-w-5xl aspect-video bg-[#0d0f14] border border-white/10 rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-500 ${isCameraOn ? 'border-blue-500/30 shadow-blue-500/10 scale-100' : 'scale-[0.98]'}`}>
          
          {/* Placeholder state */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center text-slate-500 transition-opacity duration-500 ${isCameraOn ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
               <span className="text-3xl opacity-70">📷</span>
             </div>
             <p className="font-medium tracking-wide text-lg text-slate-400 mb-1">Camera is turned off</p>
             <p className="text-sm text-slate-600">Click "Start Camera" to view the live feed</p>
          </div>

          {/* Video element */}
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            className={`w-full h-full object-cover relative z-10 transition-opacity duration-700 ${isCameraOn ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Subtle grid overlay for "monitoring" effect when camera is on */}
          {isCameraOn && (
             <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
