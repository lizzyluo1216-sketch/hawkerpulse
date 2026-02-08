
import React, { useState } from 'react';
import { Heatmap } from './components/Heatmap';
import { TopRecommendations } from './components/TopRecommendations';
import { StallCard } from './components/StallCard';
import { QueueTracker } from './components/QueueTracker';
import { ScheduleView } from './components/ScheduleView';
import { RedemptionMall } from './components/RedemptionMall';
import { STALLS } from './constants';
import { Stall } from './types';

const App: React.FC = () => {
  const [selectedStallId, setSelectedStallId] = useState<string | null>(null);
  const [showTracker, setShowTracker] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'mall'>('home');
  const [points, setPoints] = useState(850);
  const [lastStats, setLastStats] = useState({ timeSaved: 15, pointsEarned: 150, title: '避峰达人' });

  const activeStall = STALLS.find(s => s.id === selectedStallId);

  const handleStallSelect = (id: string) => {
    setSelectedStallId(id);
    setShowTracker(true);
  };

  const handleFinish = () => {
    // 根据当前档口生成随机且合理的节省时间 (8-22分钟)
    const timeSaved = Math.floor(Math.random() * 15) + 8;
    const earned = timeSaved * 10; // 每分钟节省奖励10积分
    
    let title = '避峰达人';
    if (timeSaved > 18) title = '省时狂魔';
    else if (timeSaved < 10) title = '机智之选';

    setLastStats({ timeSaved, pointsEarned: earned, title });
    setPoints(prev => prev + earned);
    setShowTracker(false);
    setShowFeedback(true);
  };

  const closeFeedback = () => {
    setShowFeedback(false);
    setSelectedStallId(null);
  };

  const goToMall = () => {
    closeFeedback();
    setActiveTab('mall');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <ScheduleView onSelectStall={handleStallSelect} />;
      case 'mall':
        return <RedemptionMall points={points} />;
      default:
        return (
          <>
            <section className="mb-6">
              <Heatmap />
            </section>
            <section>
              <TopRecommendations onSelect={handleStallSelect} />
            </section>
            <section className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-gray-800">全部档口决策</h3>
                <button className="text-xs text-blue-600 font-bold">筛选与排序 ↓</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {STALLS.map(stall => (
                  <StallCard 
                    key={stall.id} 
                    stall={stall} 
                    onSelect={handleStallSelect} 
                  />
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* PPT Style Background Grids */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-6 grid-rows-12 h-full w-full">
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} className="border border-blue-900"></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="p-6 pt-10 relative z-10 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-blue-800 tracking-tighter italic">HawkerPulse</h1>
          <p className="text-sm font-bold text-red-500 uppercase tracking-widest mt-1">食光脉搏 • NTU Koufu</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-yellow-50 px-3 py-1 rounded-xl border border-yellow-200 flex items-center space-x-1 shadow-sm">
            <span className="text-lg">🌟</span>
            <span className="text-sm font-black text-yellow-700">{points}</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1 flex items-center">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping mr-1"></div>
            12:55 PM
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        {renderContent()}
      </main>

      {/* Bottom Nav */}
      <nav className="bg-white border-t border-gray-100 p-4 fixed bottom-0 left-0 right-0 max-w-md mx-auto flex justify-around items-center z-20 shadow-lg">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center flex-1 transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] font-bold">首页</span>
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center flex-1 transition-colors ${activeTab === 'schedule' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <span className="text-2xl">📅</span>
          <span className="text-[10px] font-bold">课表</span>
        </button>
        <div className="flex-1 flex justify-center">
          <div className="bg-blue-600 w-12 h-12 rounded-full -mt-10 border-4 border-white flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
              🔍
          </div>
        </div>
        <button 
          onClick={() => setActiveTab('mall')}
          className={`flex flex-col items-center flex-1 transition-colors ${activeTab === 'mall' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <span className="text-2xl">🎁</span>
          <span className="text-[10px] font-bold">兑换</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center flex-1">
          <span className="text-2xl">⚙️</span>
          <span className="text-[10px] font-bold">设置</span>
        </button>
      </nav>

      {/* Active Queue Tracker Overlay */}
      {showTracker && activeStall && (
        <QueueTracker stall={activeStall} onFinish={handleFinish} />
      )}

      {/* Feedback Pop-up */}
      {showFeedback && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full text-center shadow-2xl animate-bounce-in">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
              ✅
            </div>
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full mb-2 uppercase tracking-widest">
                {lastStats.title}
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">取餐成功!</h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                感谢通过 HawkerPulse 辅助决策。<br/>
                你比盲目排队节省了约 <span className="text-blue-600 font-bold">{lastStats.timeSaved} 分钟</span>!
            </p>
            <div className="bg-yellow-50 p-4 rounded-2xl flex items-center justify-between border border-yellow-100 mb-6">
                <div className="text-left">
                    <span className="text-xs text-yellow-600 font-bold uppercase block">Earned Rewards</span>
                    <span className="text-xl font-black text-yellow-700">+{lastStats.pointsEarned} 积分</span>
                </div>
                <div className="text-3xl animate-pulse">🌟</div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={goToMall}
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-black text-white transition-all active:scale-95 shadow-xl shadow-blue-900/40"
              >
                前往商城兑换礼品
              </button>
              <button 
                onClick={closeFeedback}
                className="w-full bg-gray-100 hover:bg-gray-200 py-4 rounded-2xl font-bold text-gray-600 transition-all active:scale-95"
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
