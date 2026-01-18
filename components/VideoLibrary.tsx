
import React, { useState } from 'react';
import { 
  FileVideo, 
  Search, 
  Upload, 
  MoreVertical, 
  Play, 
  Trash2, 
  Sparkles,
  Loader2,
  // Added missing Cast icon import
  Cast
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const MOCK_VIDEOS = [
  { id: '1', name: 'Product_Launch_Main.mp4', size: '1.2 GB', duration: '05:22', date: '2024-05-12', thumbnail: 'https://picsum.photos/seed/vid1/300/200' },
  { id: '2', name: 'Tutorial_Masterclass_01.mp4', size: '850 MB', duration: '12:45', date: '2024-05-10', thumbnail: 'https://picsum.photos/seed/vid2/300/200' },
  { id: '3', name: 'Marketing_Campaign_v2.mp4', size: '450 MB', duration: '00:30', date: '2024-05-08', thumbnail: 'https://picsum.photos/seed/vid3/300/200' },
  { id: '4', name: 'Company_Retreat_Highlights.mp4', size: '2.4 GB', duration: '15:10', date: '2024-05-01', thumbnail: 'https://picsum.photos/seed/vid4/300/200' },
];

const VideoLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});

  const filteredVideos = MOCK_VIDEOS.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const generateDescription = async (videoId: string, filename: string) => {
    setIsGenerating(videoId);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a compelling 1-sentence stream description and 3 relevant hashtags for a video file named "${filename}".`,
      });
      
      setDescriptions(prev => ({
        ...prev,
        [videoId]: response.text || "No description generated."
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <h1 className="text-2xl font-bold">Video Assets</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search library..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-all w-full md:w-64"
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 md:px-4 md:py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shrink-0">
            <Upload size={18} />
            <span className="hidden md:inline">UPLOAD VIDEO</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <div key={video.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all">
            <div className="relative h-48 bg-slate-800">
              <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all">
                  <Play size={24} fill="white" />
                </button>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white">
                {video.duration}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-200 truncate pr-4">{video.name}</h3>
                <button className="text-slate-500 hover:text-slate-200">
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><FileVideo size={14} /> {video.size}</span>
                <span>Uploaded: {video.date}</span>
              </div>

              {descriptions[video.id] && (
                <div className="mb-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                  <p className="text-xs text-indigo-200 italic">"{descriptions[video.id]}"</p>
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                  <Cast size={14} /> STREAM NOW
                </button>
                <button 
                  onClick={() => generateDescription(video.id, video.name)}
                  disabled={isGenerating === video.id}
                  className="flex-1 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating === video.id ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  AI OPTIMIZE
                </button>
                <button className="bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 p-2 rounded-xl transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLibrary;
