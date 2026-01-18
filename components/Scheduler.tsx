
import React from 'react';
import { 
  Calendar, 
  Clock, 
  Repeat, 
  Trash2, 
  MoreVertical,
  ChevronRight,
  Plus
} from 'lucide-react';

const Scheduler: React.FC = () => {
  const schedules = [
    { id: '1', title: 'Daily Tech News', time: '10:00 AM', days: ['Mon', 'Wed', 'Fri'], video: 'News_Template.mp4', active: true },
    { id: '2', title: 'Weekend Masterclass', time: '02:00 PM', days: ['Sat', 'Sun'], video: 'Lesson_Full.mp4', active: false },
    { id: '3', title: '24/7 Music Loop', time: 'Continuous', days: ['Everyday'], video: 'Lofi_Chill_Mix.mp4', active: true },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Cron Scheduler</h1>
          <p className="text-sm text-slate-400 mt-1">Automate your broadcasts with internal task scheduling.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all">
          <Plus size={20} /> NEW SCHEDULE
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-slate-800">
          {schedules.map((task) => (
            <div key={task.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-800/30 transition-all">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${task.active ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                  {task.title === '24/7 Music Loop' ? <Repeat size={28} /> : <Calendar size={28} />}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-200">{task.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {task.time}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {task.days.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-xs text-slate-500 font-bold uppercase">Video Asset</p>
                  <p className="text-sm font-semibold text-slate-300">{task.video}</p>
                </div>
                <div className="h-10 w-[1px] bg-slate-800 mx-2 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${task.active ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${task.active ? 'right-1' : 'left-1'}`}></div>
                  </div>
                  <button className="p-2 text-slate-500 hover:text-slate-200">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Preview Mock */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <Calendar size={18} className="text-indigo-400" />
          Weekly Overview
        </h3>
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="space-y-3">
              <p className="text-center text-[10px] font-bold text-slate-500 uppercase">{day}</p>
              <div className="bg-slate-950/50 min-h-[120px] rounded-xl border border-slate-800/50 p-2 space-y-2">
                {day === 'Mon' || day === 'Wed' || day === 'Fri' ? (
                  <div className="bg-indigo-600/20 border border-indigo-500/20 p-2 rounded text-[10px] text-indigo-400 font-bold">
                    10:00 News
                  </div>
                ) : null}
                {day === 'Sat' || day === 'Sun' ? (
                  <div className="bg-amber-600/20 border border-amber-500/20 p-2 rounded text-[10px] text-amber-400 font-bold">
                    14:00 Class
                  </div>
                ) : null}
                <div className="bg-emerald-600/20 border border-emerald-500/20 p-2 rounded text-[10px] text-emerald-400 font-bold">
                  All Day Loop
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
