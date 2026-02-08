
import React from 'react';
import { Stall } from '../types';
import { STALLS } from '../constants';

interface StallCardProps {
  stall: Stall;
  onSelect: (id: string) => void;
}

export const StallCard: React.FC<StallCardProps> = ({ stall, onSelect }) => {
  const isSlow = stall.type === 'slow';
  const isLowStock = stall.stockCount < 50; // 阈值调高到50份
  
  // 查找库存充足的替代方案
  const alternative = isLowStock 
    ? STALLS.find(s => s.id !== stall.id && s.type === stall.type && s.stockCount >= 50) 
      || STALLS.find(s => s.id !== stall.id && s.type === 'fast' && s.stockCount >= 50)
    : null;

  return (
    <div 
      onClick={() => onSelect(stall.id)}
      className={`bg-white rounded-xl overflow-hidden shadow-sm border transition-all active:scale-95 cursor-pointer hover:border-blue-500 ${isLowStock ? 'border-red-200' : 'border-gray-200'}`}
    >
      <div className="relative h-24 w-full">
        <img src={stall.image} alt={stall.name} className="w-full h-full object-cover opacity-80" />
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold text-white ${isSlow ? 'bg-red-500' : 'bg-green-500'}`}>
          {stall.label}
        </div>
        
        {/* Stock Badge */}
        <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold ${isLowStock ? 'bg-red-600 text-white' : 'bg-black/50 text-white'}`}>
          剩余: {stall.stockCount}份
        </div>
      </div>
      
      <div className="p-3">
        <h4 className="font-bold text-gray-900 flex justify-between items-center">
          {stall.name}
          {isLowStock && <span className="text-[10px] text-red-600 animate-pulse">即将售罄!</span>}
        </h4>
        <p className="text-[10px] text-gray-500 mb-2 truncate">{stall.subLabel}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-2 mt-auto">
          <div className="bg-gray-50 p-1.5 rounded-lg text-center">
            <span className="block text-[10px] text-gray-400">当前排队</span>
            <span className="font-bold text-sm text-gray-800">{stall.queueCount}人</span>
          </div>
          <div className="bg-blue-50 p-1.5 rounded-lg text-center">
            <span className="block text-[10px] text-blue-400">预计等待</span>
            <span className="font-bold text-sm text-blue-700">{stall.estimatedWait}min</span>
          </div>
        </div>

        {isLowStock && alternative && (
          <div className="text-[9px] bg-red-50 text-red-700 p-1.5 rounded border border-red-100 mt-1">
            推荐替代: <span className="font-bold">{alternative.name}</span> ({alternative.estimatedWait}min)
          </div>
        )}
      </div>
    </div>
  );
};
