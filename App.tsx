
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  Settings, 
  Calendar, 
  Terminal, 
  Cast, 
  Power,
  Activity,
  HardDrive,
  Users
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import VideoLibrary from './components/VideoLibrary';
import Destinations from './components/Destinations';
import Scheduler from './components/Scheduler';
import Logs from './components/Logs';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'videos' | 'destinations' | 'scheduler' | 'logs'>('dashboard');
  const [isLive, setIsLive] = useState(false);

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'videos', label: 'Video Library', icon: Video },
    { id: 'destinations', label: 'Destinations', icon: Cast },
    { id: 'scheduler', label: 'Scheduler', icon: Calendar },
    { id: 'logs', label: 'System Logs', icon: Terminal },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard isLive={isLive} />;
      case 'videos': return <VideoLibrary />;
      case 'destinations': return <Destinations />;
      case 'scheduler': return <Scheduler />;
      case 'logs': return <Logs />;
      default: return <Dashboard isLive={isLive} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Cast className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">GeminiStream</h1>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Self-Hosted</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Server Status</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] text-emerald-500 font-bold uppercase">Online</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                  <span>CPU Usage</span>
                  <span>14%</span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '14%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                  <span>Storage</span>
                  <span>42.8 GB / 100 GB</span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '42.8%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-bottom border-slate-800 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 mr-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-indigo-400" />
                <span>Uptime: 4d 12h 30m</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive size={14} className="text-indigo-400" />
                <span>DB: 1.2MB</span>
              </div>
            </div>
            <button 
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all shadow-lg ${
                isLive 
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
              }`}
            >
              <Power size={16} />
              {isLive ? 'STOP STREAM' : 'START LIVE'}
            </button>
          </div>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
