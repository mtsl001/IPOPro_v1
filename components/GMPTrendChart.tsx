
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { GMPDataPoint } from '../types';

interface GMPTrendChartProps {
  data: GMPDataPoint[];
  symbol: string;
}

export const GMPTrendChart: React.FC<GMPTrendChartProps> = ({ data, symbol }) => {
  if (!data || data.length === 0) return (
    <div className="h-24 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-lg">
      No Data
    </div>
  );

  const isPositive = data[data.length - 1].price >= 0;
  const strokeColor = isPositive ? '#16a34a' : '#dc2626'; // Green or Red

  return (
    <div className="w-full h-24">
      <div className="flex justify-between items-center mb-1 px-1">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Trend (10D)</span>
        <span className={`text-[10px] font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {data[data.length - 1].percentage}%
        </span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            hide 
          />
          <YAxis 
            hide 
            domain={['auto', 'auto']} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px', padding: '4px 8px' }}
            itemStyle={{ color: '#333' }}
            formatter={(value: number) => [`₹${value}`, 'GMP']}
            labelStyle={{ display: 'none' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke={strokeColor} 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 4 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
