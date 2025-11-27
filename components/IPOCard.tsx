import React from 'react';
import { IPO, IPOStatus, Recommendation } from '../types';
import { BarChart2, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IPOCardProps {
  ipo: IPO;
  isWatchlisted?: boolean;
  onToggleWatchlist?: (id: string) => void;
}

const getRecommendationStyle = (rec?: Recommendation) => {
  switch (rec) {
    case Recommendation.STRONG_APPLY: return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/20';
    case Recommendation.MODERATE_APPLY: return 'bg-blue-50 text-blue-700 border-blue-100 ring-blue-500/20';
    case Recommendation.CAUTIOUS: return 'bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/20';
    case Recommendation.AVOID: return 'bg-rose-50 text-rose-700 border-rose-100 ring-rose-500/20';
    default: return 'bg-gray-50 text-gray-700 border-gray-100';
  }
};

const getStatusBadge = (status: IPOStatus) => {
  switch (status) {
    case IPOStatus.OPEN: 
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>LIVE</span>;
    case IPOStatus.UPCOMING: 
      return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">UPCOMING</span>;
    case IPOStatus.CLOSED: 
      return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">CLOSED</span>;
    case IPOStatus.LISTED: 
      return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">LISTED</span>;
    default: return null;
  }
};

export const IPOCard: React.FC<IPOCardProps> = ({ ipo, isWatchlisted, onToggleWatchlist }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 group flex flex-col h-full">
      <div className="p-6 flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex gap-4 items-center flex-1 pr-2 min-w-0">
            {/* Logo */}
            <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 font-black text-gray-300 overflow-hidden shadow-sm">
              {ipo.logoUrl ? <img src={ipo.logoUrl} alt={ipo.name} className="w-full h-full object-cover" /> : ipo.name.substring(0, 2)}
            </div>
            
            {/* Title */}
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors truncate">
                <Link to={`/app/analysis/${ipo.id}`}>{ipo.name}</Link>
              </h3>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-1 truncate">
                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{ipo.sector}</span>
                <span>•</span>
                <span className="font-mono">{ipo.issueSize}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="flex items-center gap-2">
               {getStatusBadge(ipo.status)}
               <button 
                 onClick={(e) => {
                    e.preventDefault();
                    onToggleWatchlist && onToggleWatchlist(ipo.id);
                 }}
                 className={`p-1.5 rounded-full hover:bg-gray-50 transition-colors ${isWatchlisted ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
               >
                 <Star size={16} fill={isWatchlisted ? "currentColor" : "none"} />
               </button>
            </div>
          </div>
        </div>

        {/* Verdict Badge */}
        {ipo.recommendation && (
            <div className={`mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wide ring-1 ring-inset ${getRecommendationStyle(ipo.recommendation)}`}>
              <span>Verdict:</span>
              <span>{ipo.recommendation}</span>
            </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <MetricBox label="Price Band" value={ipo.priceBand} />
          <MetricBox label="Lot Size" value={`${ipo.lotSize || '-'} Shares`} />
          <MetricBox label="Close Date" value={ipo.closeDate} />
          <div className={`p-3 rounded-xl border ${ipo.gmp > 0 ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'}`}>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wide mb-1">GMP</p>
            <div className="flex items-baseline gap-1.5">
              <span className={`font-black text-sm ${ipo.gmp > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {ipo.gmp > 0 ? '+' : ''}₹{ipo.gmp}
              </span>
              <span className={`text-[10px] font-bold ${ipo.gmp > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                ({ipo.gmpPercentage}%)
              </span>
            </div>
          </div>
        </div>

        {/* Subscription Progress */}
        {ipo.status === IPOStatus.OPEN && (
          <div className="mb-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-1.5">
              <span>Subscription Demand</span>
              <span className="text-gray-900">{ipo.subscription.total}x</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min(ipo.subscription.total * 5, 100)}%` }}
              ></div>
            </div>
            <div className="flex gap-3 text-[10px] font-medium text-gray-500">
               <span>RII: <b className="text-gray-900">{ipo.subscription.rii}x</b></span>
               <span>NII: <b className="text-gray-900">{ipo.subscription.nii}x</b></span>
               <span>QIB: <b className="text-gray-900">{ipo.subscription.qib}x</b></span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
        <Link to={`/app/analysis/${ipo.id}`} className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group/btn shadow-sm">
          <BarChart2 size={16} className="text-gray-400 group-hover/btn:text-blue-500" />
          View Analysis
        </Link>
        <button className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors shadow-lg shadow-slate-900/10">
           <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value }: { label: string, value: string }) => (
  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wide mb-1">{label}</p>
    <p className="font-bold text-gray-900 text-sm truncate">{value}</p>
  </div>
);