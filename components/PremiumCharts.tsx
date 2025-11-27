
import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { ValuationPoint } from '../types';

interface ValuationScatterChartProps {
  data: ValuationPoint[];
}

export const ValuationScatterChart: React.FC<ValuationScatterChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Revenue Growth" 
            unit="%" 
            label={{ value: 'Revenue Growth (%)', position: 'bottom', offset: 0 }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="P/E Ratio" 
            unit="x"
            label={{ value: 'P/E Ratio', angle: -90, position: 'insideLeft' }}
          />
          <ZAxis type="number" dataKey="z" range={[100, 600]} name="Market Cap" />
          <Tooltip 
             cursor={{ strokeDasharray: '3 3' }} 
             content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg text-sm">
                      <p className="font-bold text-gray-900">{data.name}</p>
                      <p className="text-gray-600">Growth: {data.x}%</p>
                      <p className="text-gray-600">P/E: {data.y}x</p>
                      <p className="text-gray-500 text-xs mt-1">{data.type}</p>
                    </div>
                  );
                }
                return null;
             }}
          />
          <Legend />
          
          {/* Trend Line (Arbitrary line to show Overvalued/Undervalued zones) */}
          <ReferenceLine segment={[{ x: 0, y: 10 }, { x: 50, y: 80 }]} stroke="red" strokeDasharray="3 3" label="Fair Value Line" />

          <Scatter name="Peers" data={data.filter(d => d.type === 'Peer')} fill="#9ca3af" shape="circle" />
          <Scatter name="IPO" data={data.filter(d => d.type === 'IPO')} fill="#2563eb" shape="diamond" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
