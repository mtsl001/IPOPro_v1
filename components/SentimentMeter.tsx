
import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';

interface SentimentMeterProps {
  score: number; // 0 to 100
}

export const SentimentMeter: React.FC<SentimentMeterProps> = ({ score }) => {
  // Determine color and text based on score
  let color = 'bg-gray-500';
  let textColor = 'text-gray-700';
  let text = 'Neutral';

  if (score >= 80) {
    color = 'bg-green-600';
    textColor = 'text-green-700';
    text = 'Very Bullish';
  } else if (score >= 60) {
    color = 'bg-green-500';
    textColor = 'text-green-600';
    text = 'Bullish';
  } else if (score <= 20) {
    color = 'bg-red-600';
    textColor = 'text-red-700';
    text = 'Very Bearish';
  } else if (score <= 40) {
    color = 'bg-red-500';
    textColor = 'text-red-600';
    text = 'Bearish';
  } else {
    color = 'bg-yellow-500';
    textColor = 'text-yellow-600';
    text = 'Neutral';
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Activity size={18} className="text-blue-600" />
          Market Mood
        </h3>
        <span className={`text-xs font-bold px-2 py-1 rounded bg-opacity-10 ${textColor.replace('text', 'bg')}`}>
           AI Analysis
        </span>
      </div>

      <div className="relative mb-6">
        {/* Progress Bar Background */}
        <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
           <div className="h-full w-1/3 bg-gradient-to-r from-red-500 to-red-300 opacity-20"></div>
           <div className="h-full w-1/3 bg-yellow-200 opacity-20"></div>
           <div className="h-full w-1/3 bg-gradient-to-r from-green-300 to-green-500 opacity-20"></div>
        </div>

        {/* Marker */}
        <div 
          className="absolute top-[-4px] w-1 h-6 bg-black rounded-sm transition-all duration-1000 ease-out shadow-lg"
          style={{ left: `${score}%` }}
        >
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
            {score}
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className={`text-2xl font-black ${textColor} uppercase tracking-tight`}>
          {text}
        </div>
        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">
          Consensus based on News & GMP
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-center">
         <div>
            <span className="text-[10px] text-gray-400 block uppercase">Social Vol</span>
            <span className="text-sm font-bold text-gray-700">High</span>
         </div>
         <div>
            <span className="text-[10px] text-gray-400 block uppercase">News Tone</span>
            <span className={`text-sm font-bold ${textColor}`}>{text}</span>
         </div>
      </div>
    </div>
  );
};
