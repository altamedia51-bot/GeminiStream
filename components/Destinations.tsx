
import React, { useState } from 'react';
import { 
  Plus, 
  Cast, 
  Eye, 
  EyeOff, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState([
    { id: '1', name: 'Youtube Primary', url: 'rtmp://a.rtmp.youtube.com/live2', key: '••••••••••••••••', active: true, platform: 'youtube' },
    { id: '2', name: 'Twitch TV', url: 'rtmp://live.twitch.tv/app/', key: '••••••••••••••••', active: false, platform: 'twitch' },
    { id: '3', name: 'Facebook Live', url: 'rtmps://live-api-s.facebook.com:443/rtmp/', key: '••••••••••••••••', active: true, platform: 'facebook' },
  ]);

  const toggleStatus = (id: string) => {
    setDestinations(destinations.map(d => d.id === id ? { ...d, active: !d.active } : d));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">RTMP Destinations</h1>
          <p className="text-sm text-slate-400 mt-1">Configure multi-stream targets for simultaneous broadcasting.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all">
          <Plus size={20} /> ADD DESTINATION
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {destinations.map(dest => (
          <div key={dest.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${dest.active ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                  <Cast className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    {dest.name}
                    {dest.active && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase font-bold border border-emerald-500/30">Active</span>}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <ShieldCheck size={14} className="text-indigo-400" />
                    <span>Secure Protocol (RTMP/RTMPS)</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 md:max-w-md">
                <div className="grid grid-cols-1 gap-2">
                  <div className="relative group">
                    <input 
                      readOnly 
                      value={dest.url} 
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-lg py-2 px-3 text-xs font-mono text-slate-400 focus:outline-none"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-indigo-400">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                  <div className="relative">
                    <input 
                      type="password"
                      readOnly 
                      value={dest.key} 
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-lg py-2 px-3 text-xs font-mono text-slate-400 focus:outline-none"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-indigo-400">
                      <EyeOff size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleStatus(dest.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                    dest.active 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {dest.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  {dest.active ? 'ENABLED' : 'DISABLED'}
                </button>
                <button className="p-3 bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex gap-4">
        <div className="p-3 bg-amber-500/20 rounded-xl h-fit">
          <ShieldCheck size={24} className="text-amber-500" />
        </div>
        <div>
          <h4 className="font-bold text-amber-500">Resource Tip</h4>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Multi-streaming significantly increases CPU and upload bandwidth requirements. 
            Ensure your VPS has enough threads for multiple FFmpeg encoders (recommended: 2 cores per 1080p output).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
