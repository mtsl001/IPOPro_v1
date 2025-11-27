import React from 'react';
import { FinancialScore } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FinancialScorecardProps {
  score: FinancialScore;
}

/**
 * FinancialScorecard Component
 * 
 * Visualizes financial health with a prominent Overall Score number 
 * and detailed progress bars for specific categories.
 */
export const FinancialScorecard: React.FC<FinancialScorecardProps> = ({ score }) => {
  
  // Dynamic color based on score
  const getScoreColor = (val: number) => {
    if (val >= 75) return '#16a34a'; // Green
    if (val >= 50) return '#2563eb'; // Blue
    if (val >= 35) return '#d97706'; // Yellow/Orange
    return '#dc2626'; // Red
  };

  const scoreColor = getScoreColor(score.total);

  // Gauge Data for the circular indicator around the score
  const gaugeData = [
    { name: 'Score', value: score.total },
    { name: 'Remaining', value: 100 - score.total },
  ];

  const MetricRow = ({ label, value }: { label: string, value: number }) => (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-xs font-medium mb-1.5 text-gray-600">
        <span>{label}</span>
        <span className="font-bold text-gray-900">{value}/100</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000" 
          style={{ width: `${value}%`, backgroundColor: getScoreColor(value) }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-3">
        Financial Health Scorecard
      </h2>
      
      <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
        
        {/* Left: Overall Score Big Number */}
        <div className="flex flex-col items-center justify-center md:w-1/3">
          <div className="relative w-32 h-32 flex items-center justify-center">
             {/* Simple Ring Chart */}
             <div className="absolute inset-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gaugeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={64}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill={scoreColor} />
                      <Cell fill="#f3f4f6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
             </div>
             
             {/* Center Number */}
             <div className="text-center z-10 mt-1">
                <div className="text-4xl font-black text-gray-900 leading-none">{score.total}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Overall Score</div>
             </div>
          </div>
        </div>

        {/* Right: Detailed Metrics List */}
        <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
          <div className="space-y-1">
            <MetricRow label="Profitability" value={score.profitability} />
            <MetricRow label="Cash Flow Quality" value={score.cashFlow} />
            <MetricRow label="Balance Sheet Strength" value={score.balanceSheet} />
            <MetricRow label="Growth Quality" value={score.growth} />
            <MetricRow label="Governance" value={score.governance} />
            <MetricRow label="Valuation Sanity" value={score.valuation} />
          </div>
        </div>
      </div>
    </div>
  );
};