
import React from 'react';
import { Stall } from '../types';
import { STALLS } from '../constants';

interface TopRecommendationsProps {
  onSelect: (id: string) => void;
}

export const TopRecommendations: React.FC<TopRecommendationsProps> = ({ onSelect }) => {
  const topStalls = [...STALLS]
    .sort((a, b) => a.estimatedWait - b.estimatedWait)
    .slice(0, 3);

  return (
    <div className="my-6">
      <div className="flex justify-between items-end mb-3 px-1">
        <div>
          <h2 className="text-xl font-black text-blue-700 italic">TOP 3</h2>
          <p className="text-xs text-gray-500">速度优先 • 告别下课焦虑</p>
        </div>
        <div className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">
          高峰时段: 12:45 - 13:10
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {topStalls.map((stall, idx) => (
          <div 
            key={stall.id}
            onClick={() => onSelect(stall.id)}
            className="relative bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-3 text-white shadow-lg shadow-blue-200 transition-all active:scale-95 cursor-pointer"
          >
            <div className="absolute -top-2 -left-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
              {idx + 1}
            </div>
            <div className="text-[11px] font-bold opacity-80 mb-1">{stall.name}</div>
            <div className="text-lg font-black tracking-tighter">~{stall.estimatedWait}min</div>
            <div className="text-[9px] mt-1 bg-white/20 px-1 py-0.5 rounded text-center">拿餐最稳</div>
          </div>
        ))}
      </div>
    </div>
  );
};
