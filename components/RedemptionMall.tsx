
import React from 'react';
import { REDEEM_ITEMS, MEDALS } from '../constants';

interface RedemptionMallProps {
  points: number;
}

export const RedemptionMall: React.FC<RedemptionMallProps> = ({ points }) => {
  return (
    <div className="p-1">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-3xl p-6 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs opacity-70 mb-1">当前可用积分</p>
          <div className="text-4xl font-black tracking-tighter mb-4">{points}</div>
          <div className="flex space-x-2">
            <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold">等级: 时间大师</div>
            <div className="bg-yellow-500/30 px-3 py-1 rounded-full text-[10px] font-bold text-yellow-200">排名: Top 5%</div>
          </div>
        </div>
        <div className="absolute top-[-20px] right-[-20px] text-9xl opacity-10">🌟</div>
      </div>

      <section className="mb-8">
        <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center">
          <span className="w-1.5 h-4 bg-blue-600 mr-2 rounded-full"></span>
          成就勋章
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {MEDALS.map(medal => (
            <div key={medal.id} className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-1 shadow-sm border-2 ${medal.unlocked ? 'bg-yellow-50 border-yellow-200 opacity-100' : 'bg-gray-50 border-gray-100 opacity-30 grayscale'}`}>
                {medal.icon}
              </div>
              <span className="text-[9px] font-bold text-gray-700 text-center leading-tight">{medal.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center">
          <span className="w-1.5 h-4 bg-red-600 mr-2 rounded-full"></span>
          兑换商城
        </h3>
        <div className="space-y-3">
          {REDEEM_ITEMS.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all active:scale-[0.98]">
              <div className="flex items-center space-x-4">
                <div className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                  <p className="text-[10px] text-blue-600 font-bold">{item.cost} 积分</p>
                </div>
              </div>
              <button 
                disabled={points < item.cost}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${points >= item.cost ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                兑换
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
