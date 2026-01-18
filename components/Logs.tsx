
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Trash2, Download, Play, Square } from 'lucide-react';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState([
    { id: '1', time: '14:20:05', level: 'INFO', msg: 'System initialized successfully.' },
    { id: '2', time: '14:20:06', level: 'DB', msg: 'SQLite connected: /db/streamflow.sqlite' },
    { id: '3', time: '14:20:07', level: 'INFO', msg: 'Ready for FFmpeg orchestration.' },
    { id: '4', time: '14:25:01', level: 'AUTH', msg: 'Admin login from 192.168.1.1' },
    { id: '5', time: '14:30:12', level: 'FFMPEG', msg: 'Starting stream: video_asset_01.mp4' },
    { id: '6', time: '14:30:13', level: 'FFMPEG', msg: 'Encoder: h264_nvenc (Hardware accelerated)' },
    { id: '7', time: '14:30:14', level: 'FFMPEG', msg: 'Destination: Youtube Primary connected.' },
    { id: '8', time: '14:30:15', level: 'FFMPEG', msg: 'frame=  124 fps= 60 q=28.0 size=    2560kB time=00:00:02.05 bitrate=10182.4kbits/s speed=1.0x' },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-sky-400';
      case 'FFMPEG': return 'text-emerald-400';
      case 'DB': return 'text-indigo-400';
      case 'AUTH': return 'text-amber-400';
      case 'ERROR': return 'text-rose-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Terminal className="text-indigo-400" />
          <h1 className="text-2xl font-bold">System Console</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg transition-all">
            <Download size={16} /> EXPORT LOGS
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-600/10 text-rose-500 hover:bg-rose-600/20 text-xs font-bold rounded-lg transition-all">
            <Trash2 size={16} /> CLEAR
          </button>
        </div>
      </div>

      <div className="flex-1 bg-black rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">root@gemini-stream:~/app/logs</span>
        </div>
        
        <div ref={scrollRef} className="flex-1 p-6 font-mono text-sm space-y-2 overflow-y-auto bg-slate-950 selection:bg-indigo-500 selection:text-white">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-4 group">
              <span className="text-slate-600 shrink-0 select-none">[{log.time}]</span>
              <span className={`font-bold shrink-0 select-none min-w-[60px] ${getLevelColor(log.level)}`}>{log.level}</span>
              <span className="text-slate-300 break-all">{log.msg}</span>
            </div>
          ))}
          <div className="flex gap-4 animate-pulse">
            <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString('it-IT')}]</span>
            <span className="text-indigo-500 font-bold shrink-0">_</span>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Send custom command to FFmpeg..." 
              className="w-full bg-black border border-slate-800 rounded-lg py-2 px-4 text-xs font-mono text-indigo-400 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all">
            <Play size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">FFmpeg Threads</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: '65%' }}></div>
            </div>
            <span className="text-xs font-mono text-emerald-400">8/12</span>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Network Outbound</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: '45%' }}></div>
            </div>
            <span className="text-xs font-mono text-indigo-400">12.5 MB/s</span>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Memory Usage</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: '22%' }}></div>
            </div>
            <span className="text-xs font-mono text-amber-400">1.2 GB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
