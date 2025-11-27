
import React from 'react';
import { NewsItem } from '../types';
import { Newspaper, ExternalLink, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface NewsFeedProps {
  news: NewsItem[];
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ news }) => {
  if (!news || news.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Newspaper size={18} className="text-blue-600" />
          News Intelligence
        </h3>
        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">
          {news.length} Updates
        </span>
      </div>

      <div className="divide-y divide-gray-100 overflow-y-auto max-h-[400px]">
        {news.map((item) => (
          <div key={item.id} className="p-5 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                {item.source} • {item.date}
              </span>
              {item.sentiment === 'Positive' && (
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1">
                  <ArrowUpRight size={10} /> BULLISH
                </span>
              )}
              {item.sentiment === 'Negative' && (
                <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded flex items-center gap-1">
                  <ArrowDownRight size={10} /> BEARISH
                </span>
              )}
              {item.sentiment === 'Neutral' && (
                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded flex items-center gap-1">
                  <Minus size={10} /> NEUTRAL
                </span>
              )}
            </div>
            
            <h4 className="font-bold text-gray-900 text-sm mb-2 leading-snug">
              {item.title}
            </h4>
            
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {item.summary}
            </p>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
         <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1">
           View All Sources <ExternalLink size={12} />
         </button>
      </div>
    </div>
  );
};
