
import React from 'react';
import { STALLS } from '../constants';

interface ScheduleViewProps {
  onSelectStall: (id: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onSelectStall }) => {
  const mockClasses = [
    { name: 'Human-Computer Interaction', time: '13:30 - 15:30', room: 'LHN-TR+12', isNear: true },
    { name: 'Introduction to AI', time: '16:30 - 18:30', room: 'LHN-TR+05', isNear: false },
  ];

  const lightningStalls = [...STALLS].filter(s => s.estimatedWait <= 10).slice(0, 2);

  return (
    <div className="p-1">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-blue-800 italic">我的课表</h2>
        <p className="text-xs text-gray-500">已绑定 NTU Student Portal</p>
      </div>

      <div className="space-y-4 mb-8">
        {mockClasses.map((cls, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border-2 transition-all ${cls.isNear ? 'border-red-500 bg-red-50 shadow-md shadow-red-100' : 'border-gray-100 bg-white'}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">{cls.name}</h3>
              {cls.isNear && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full animate-pulse">即将上课</span>}
            </div>
            <div className="flex space-x-4 text-xs text-gray-500">
              <span className="flex items-center">🕒 {cls.time}</span>
              <span className="flex items-center">📍 {cls.room}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">⚡</span>
          <div>
            <h3 className="font-bold text-lg">闪电出餐推荐</h3>
            <p className="text-[10px] opacity-70">检测到 30 分钟内有课，建议选择以下档口：</p>
          </div>
        </div>

        <div className="space-y-3">
          {lightningStalls.map(stall => (
            <div 
              key={stall.id} 
              onClick={() => onSelectStall(stall.id)}
              className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/20 active:scale-95 transition-all cursor-pointer"
            >
              <div>
                <div className="font-bold text-sm">{stall.name}</div>
                <div className="text-[10px] opacity-60">{stall.subLabel}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black">{stall.estimatedWait} min</div>
                <div className="text-[9px] bg-green-500/20 text-green-300 px-1 rounded inline-block">无需排队</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button className="w-full mt-6 py-3 text-sm font-bold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50">
        重新同步课表
      </button>
    </div>
  );
};
