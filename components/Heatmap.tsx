
import React from 'react';
import { COLORS } from '../constants';

export const Heatmap: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-blue-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 flex items-center">
          <span className="w-2 h-6 bg-red-600 mr-2 rounded-full"></span>
          NTU Koufu 实时热力图
        </h3>
        <div className="flex space-x-2 text-[10px]">
          <span className="flex items-center"><i className="w-2 h-2 rounded-full mr-1" style={{backgroundColor: COLORS.extreme}}></i>极度拥挤</span>
          <span className="flex items-center"><i className="w-2 h-2 rounded-full mr-1" style={{backgroundColor: COLORS.crowded}}></i>拥挤</span>
          <span className="flex items-center"><i className="w-2 h-2 rounded-full mr-1" style={{backgroundColor: COLORS.smooth}}></i>通畅</span>
        </div>
      </div>
      
      <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Main Entrance */}
          <rect x="180" y="280" width="40" height="10" fill="#333" />
          <text x="185" y="295" fontSize="8" fill="#666">入口</text>

          {/* Zones Based on PPT Layout */}
          {/* Zone A - Smooth */}
          <path d="M50,50 L150,50 L150,150 L50,150 Z" fill={COLORS.smooth} fillOpacity="0.6" className="transition-all hover:fill-opacity-80 cursor-pointer" />
          <text x="70" y="100" fontSize="12" fill="white" fontWeight="bold">快餐区</text>

          {/* Zone B - Extreme */}
          <path d="M160,50 L350,50 L350,120 L160,120 Z" fill={COLORS.extreme} fillOpacity="0.6" />
          <text x="220" y="90" fontSize="12" fill="white" fontWeight="bold">热门档口 (米线/香锅)</text>

          {/* Zone C - Crowded */}
          <path d="M50,160 L180,160 L180,250 L50,250 Z" fill={COLORS.crowded} fillOpacity="0.6" />
          <text x="75" y="210" fontSize="12" fill="white" fontWeight="bold">杂菜饭区</text>

          {/* Zone D - Smooth */}
          <path d="M190,130 L350,130 L350,250 L190,250 Z" fill={COLORS.smooth} fillOpacity="0.6" />
          <text x="240" y="200" fontSize="12" fill="white" fontWeight="bold">就餐/饮品区</text>

          {/* Labels */}
          <text x="10" y="20" fontSize="10" fill="#999">最近更新: 12:55 PM</text>
        </svg>
      </div>
    </div>
  );
};
