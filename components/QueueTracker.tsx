
import React, { useState, useEffect } from 'react';
import { Stall } from '../types';

interface QueueTrackerProps {
  stall: Stall;
  onFinish: () => void;
}

export const QueueTracker: React.FC<QueueTrackerProps> = ({ stall, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(stall.estimatedWait * 60);
  const totalSeconds = stall.estimatedWait * 60;
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onFinish]);

  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-blue-900 flex flex-col p-8 text-white z-50">
      <div className="mt-12 mb-8">
        <h2 className="text-3xl font-black mb-2 italic">食光脉搏</h2>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-sm tracking-widest opacity-80 uppercase">Active Pulse Tracking</span>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-8 flex-1 border border-white/20">
        <p className="text-blue-200 text-sm mb-1">正在排队中</p>
        <h3 className="text-2xl font-bold mb-6">{stall.name}</h3>
        
        <div className="flex justify-between items-end mb-2">
          <div className="text-6xl font-black tracking-tighter">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-right text-xs opacity-60">
            预计取餐时间<br/>13:12
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-2xl">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
              ⚡
            </div>
            <div>
              <p className="text-xs font-bold text-blue-300 mb-1">动态感知</p>
              <p className="text-[10px] opacity-70">检测到 2 人放弃排队，等待时长自动缩短 45s</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
              ⚠️
            </div>
            <div>
              <p className="text-xs font-bold text-red-300 mb-1">波动预警</p>
              <p className="text-[10px] opacity-70">前方新增大单（5份以上），预计增加 3min。建议：继续坚持。</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onFinish}
        className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl shadow-red-900/40"
      >
        我已取餐，领取积分
      </button>
      
      <button 
        onClick={onFinish}
        className="mt-4 text-sm text-white/40 hover:text-white"
      >
        取消排队
      </button>
    </div>
  );
};
