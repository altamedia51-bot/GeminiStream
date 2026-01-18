
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Users, 
  Activity, 
  Clock, 
  Radio, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const data = [
  { time: '12:00', bitrate: 4500, viewers: 120 },
  { time: '12:05', bitrate: 4800, viewers: 150 },
  { time: '12:10', bitrate: 4600, viewers: 180 },
  { time: '12:15', bitrate: 5100, viewers: 220 },
  { time: '12:20', bitrate: 4900, viewers: 310 },
  { time: '12:25', bitrate: 5200, viewers: 420 },
  { time: '12:30', bitrate: 5000, viewers: 390 },
];

const StatCard: React.FC<{ icon: any, label: string, value: string, subValue: string, color: string }> = ({ icon: Icon, label, value, subValue, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-slate-800 group-hover:${color} transition-colors`}>
        <Icon size={24} className="text-slate-400 group-hover:text-white transition-colors" />
      </div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
    <div className="space-y-1">
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <p className="text-sm text-slate-400">{subValue}</p>
    </div>
  </div>
);

const Dashboard: React.FC<{ isLive: boolean }> = ({ isLive }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Radio} 
          label="Stream Status" 
          value={isLive ? "Active" : "Idle"} 
          subValue={isLive ? "RTMP Pipeline Running" : "System ready"} 
          color="bg-emerald-600"
        />
        <StatCard 
          icon={Users} 
          label="Total Viewers" 
          value="1,284" 
          subValue="+12% from yesterday" 
          color="bg-indigo-600"
        />
        <StatCard 
          icon={Activity} 
          label="Avg Bitrate" 
          value="4.8 Mbps" 
          subValue="STABLE (1080p60)" 
          color="bg-amber-600"
        />
        <StatCard 
          icon={Clock} 
          label="Total Uptime" 
          value="156 hrs" 
          subValue="This month" 
          color="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Stream Performance</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                Bitrate (kbps)
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                Viewers
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBitrate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorViewers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="bitrate" stroke="#6366f1" fillOpacity={1} fill="url(#colorBitrate)" strokeWidth={2} />
                <Area type="monotone" dataKey="viewers" stroke="#f43f5e" fillOpacity={1} fill="url(#colorViewers)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Events / Health */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-lg mb-6">System Health</h3>
          <div className="space-y-6 flex-1">
            <div className="flex gap-4">
              <div className="mt-1">
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">SQLite Database</p>
                <p className="text-xs text-slate-400">Optimal connection (4ms latency)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1">
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">FFmpeg Runtime</p>
                <p className="text-xs text-slate-400">Build 6.0, hardware acceleration on</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1">
                <AlertCircle size={18} className="text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Storage Capacity</p>
                <p className="text-xs text-slate-400">82% full. Consider cleaning old videos.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800">
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-all">
              SYSTEM MAINTENANCE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
