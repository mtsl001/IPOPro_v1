import React, { useState } from 'react';
import { IPOCard } from '../components/IPOCard';
import { GMPTrendChart } from '../components/GMPTrendChart';
import { AllotmentCalculator } from '../components/AllotmentCalculator';
import { MOCK_IPOS } from '../constants';
import { IPOStatus } from '../types';
import { TrendingUp, Calendar, Activity, Star, ArrowUpRight, Signal } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [filter, setFilter] = useState<IPOStatus | 'ALL'>('ALL');
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredIPOs = MOCK_IPOS.filter(ipo => {
    const matchesStatus = filter === 'ALL' || ipo.status === filter;
    const matchesWatchlist = showWatchlistOnly ? watchlist.includes(ipo.id) : true;
    return matchesStatus && matchesWatchlist;
  });

  // Stats for Hero Section
  const upcomingCount = MOCK_IPOS.filter(i => i.status === IPOStatus.UPCOMING).length;
  const openCount = MOCK_IPOS.filter(i => i.status === IPOStatus.OPEN).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
      
      {/* LEFT COLUMN: Main Content (8 cols) */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* 1. Market Pulse Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sentiment Card - Dark */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group flex flex-col justify-between h-full min-h-[160px] border border-slate-800">
            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-30 -mr-10 -mt-10 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Activity size={14} /> Market Sentiment
              </div>
              <h3 className="text-3xl font-bold mb-1">Cautious</h3>
              <p className="text-sm text-slate-400 leading-snug">High volatility in GMP across mid-cap sector.</p>
            </div>
            <div className="relative z-10 mt-4 flex items-center gap-2">
               <div className="h-1.5 flex-1 bg-slate-700 rounded-full overflow-hidden">
                 <div className="h-full bg-yellow-500 w-[45%] rounded-full"></div>
               </div>
               <span className="text-xs font-mono text-yellow-500">45/100</span>
            </div>
          </div>

          {/* Live IPOs Card - Light */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full min-h-[160px] relative overflow-hidden group hover:shadow-md transition-shadow">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Signal size={80} className="text-green-600" />
             </div>
             <div className="relative z-10">
               <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live IPOs</p>
                  <div className="bg-green-100 px-2 py-1 rounded-full text-green-700 animate-pulse flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      <span className="text-[10px] font-bold uppercase">Active</span>
                  </div>
               </div>
               <h3 className="text-4xl font-bold text-gray-900">{openCount}</h3>
             </div>
             <p className="text-xs text-gray-400 relative z-10 font-medium flex items-center gap-1">
               <span className="text-gray-900 font-bold">NovaTech</span> closing today
             </p>
          </div>

          {/* Upcoming Card - Light */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full min-h-[160px] relative overflow-hidden group hover:shadow-md transition-shadow">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Calendar size={80} className="text-blue-600" />
             </div>
             <div className="relative z-10">
               <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Upcoming</p>
                  <div className="bg-blue-50 p-1.5 rounded-lg text-blue-600">
                     <ArrowUpRight size={16} />
                  </div>
               </div>
               <h3 className="text-4xl font-bold text-gray-900">{upcomingCount}</h3>
             </div>
             <div className="relative z-10">
                <div className="text-xs text-gray-500">Next Opening</div>
                <div className="text-sm font-bold text-gray-900">boAt (Oct 15)</div>
             </div>
          </div>
        </div>

        {/* 2. Filter Tabs & Watchlist Toggle (Pill Design) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-gray-100/80 p-1 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'ALL', label: 'All IPOs' },
              { id: IPOStatus.OPEN, label: 'Open Now', badge: openCount },
              { id: IPOStatus.UPCOMING, label: 'Upcoming' },
              { id: IPOStatus.LISTED, label: 'Listed' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`
                  whitespace-nowrap py-2 px-4 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all
                  ${filter === tab.id 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}
                `}
              >
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className={`py-0.5 px-1.5 rounded-md text-[10px] leading-none ${filter === tab.id ? 'bg-gray-100 text-gray-900' : 'bg-gray-200 text-gray-600'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button 
             onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
             className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all border
               ${showWatchlistOnly 
                 ? 'bg-yellow-50 border-yellow-200 text-yellow-700 shadow-sm' 
                 : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}
             `}
          >
             <Star size={14} fill={showWatchlistOnly ? "currentColor" : "none"} className={showWatchlistOnly ? "text-yellow-500" : ""} />
             Watchlist
          </button>
        </div>

        {/* 3. IPO List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredIPOs.map((ipo) => (
            <IPOCard 
              key={ipo.id} 
              ipo={ipo} 
              isWatchlisted={watchlist.includes(ipo.id)}
              onToggleWatchlist={toggleWatchlist}
            />
          ))}
          
          {filteredIPOs.length === 0 && (
            <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                 <SearchIcon className="text-gray-400" />
              </div>
              <p className="text-gray-900 font-medium">No IPOs found</p>
              <p className="text-sm text-gray-500 mt-1">Adjust your filters or check back later.</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Intelligence Sidebar (4 cols) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Widget 1: Allotment Calculator */}
        <AllotmentCalculator />

        {/* Widget 2: GMP Movers */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
               <TrendingUp size={16} className="text-blue-600" />
               GMP Movers
             </h3>
             <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold">24H</span>
           </div>
           
           <div className="space-y-6">
              {MOCK_IPOS.filter(i => i.gmpHistory.length > 0).slice(0, 3).map((ipo, idx) => (
                <div key={ipo.id} className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}</span>
                        <span className="font-bold text-gray-700 text-sm group-hover:text-blue-600 transition-colors">{ipo.symbol}</span>
                    </div>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${ipo.gmp > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {ipo.gmp > 0 ? '+' : ''}₹{ipo.gmp}
                    </span>
                  </div>
                  <GMPTrendChart data={ipo.gmpHistory} symbol={ipo.symbol} />
                </div>
              ))}
           </div>
        </div>

        {/* Widget 3: Quick Calendar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-50 -mr-8 -mt-8"></div>
           <div className="flex justify-between items-center mb-5 relative z-10">
             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
               <Calendar size={16} className="text-orange-500" />
               Critical Dates
             </h3>
             <Link to="/app/calendar" className="text-xs text-blue-600 font-bold hover:underline">View All</Link>
           </div>
           
           <div className="space-y-4 relative z-10">
              <DateRow 
                day="15" month="OCT" 
                title="boAt IPO" 
                tag="Opens" tagColor="bg-green-100 text-green-700"
                desc="Prepare capital (Avoid rec.)"
              />
              <DateRow 
                day="17" month="OCT" 
                title="NovaTech" 
                tag="Listing" tagColor="bg-purple-100 text-purple-700"
                desc="Exp. Listing: ₹580 (+25%)"
              />
           </div>
        </div>

      </div>
    </div>
  );
};

// Helper for empty state icon
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const DateRow = ({ day, month, title, tag, tagColor, desc }: any) => (
  <div className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded-lg transition-colors -mx-2">
     <div className="bg-white border border-gray-100 shadow-sm text-gray-700 px-2 py-1 rounded text-center min-w-[3rem]">
        <div className="text-[10px] font-bold uppercase">{month}</div>
        <div className="text-lg font-black leading-none">{day}</div>
     </div>
     <div>
        <div className="flex items-center gap-2 mb-0.5">
           <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
           <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${tagColor}`}>{tag}</span>
        </div>
        <p className="text-xs text-gray-500 leading-tight">{desc}</p>
     </div>
  </div>
);