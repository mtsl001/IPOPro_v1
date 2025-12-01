
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import { GMPDataPoint } from '../types';

interface GMPTrendChartProps {
  data: GMPDataPoint[];
  color?: string;
}

export const GMPTrendChart: React.FC<GMPTrendChartProps> = ({ data, color }) => {
  if (!data || data.length === 0) return null;

  // Determine color if not provided based on trend
  const lastPoint = data[data.length - 1];
  const firstPoint = data[0];
  const isPositive = lastPoint.price >= firstPoint.price;
  const chartColor = color || (isPositive ? '#16a34a' : '#dc2626');

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${chartColor}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={chartColor} 
            fillOpacity={1} 
            fill={`url(#gradient-${chartColor})`} 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
