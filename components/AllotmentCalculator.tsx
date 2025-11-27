
import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

export const AllotmentCalculator = () => {
  const [category, setCategory] = useState<'RII' | 'NII'>('RII');
  const [lots, setLots] = useState<number>(1);
  const [subscription, setSubscription] = useState<number>(45.2);

  const calculateProbability = () => {
    if (subscription === 0) return '100.0';
    let prob = 0;
    if (category === 'RII') {
        prob = Math.min(100, (1 / subscription) * 100);
    } else {
        prob = Math.min(100, (lots / subscription) * 100); 
    }
    return prob.toFixed(1);
  };

  const probability = calculateProbability();
  const probVal = parseFloat(probability);
  
  const getProbabilityColor = (val: number) => {
    if (val > 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (val > 30) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
                <Calculator size={14} />
            </div>
            Allotment Chances
            </h3>
            <button className="text-gray-400 hover:text-blue-600 transition-colors p-1 hover:bg-gray-100 rounded">
                <RefreshCw size={14} />
            </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Result Display */}
        <div className={`rounded-xl p-4 border text-center transition-colors ${getProbabilityColor(probVal)}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 block mb-1">Estimated Probability</span>
            <div className="text-4xl font-black tracking-tight">
                {probability}%
            </div>
            <p className="text-[10px] font-medium opacity-70 mt-1">Based on current subscription data</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                    onClick={() => setCategory('RII')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${category === 'RII' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Retail (RII)
                </button>
                <button 
                    onClick={() => setCategory('NII')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${category === 'NII' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    HNI (NII)
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-gray-500 pl-1">Lots Applied</label>
                    <input 
                        type="number" 
                        min="1" 
                        max="100"
                        value={lots}
                        onChange={(e) => setLots(parseInt(e.target.value) || 1)}
                        className="w-full bg-gray-50 hover:bg-white border border-gray-200 rounded-xl p-2.5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-gray-500 pl-1">Sub. Level (x)</label>
                    <input 
                        type="number" 
                        value={subscription}
                        onChange={(e) => setSubscription(parseFloat(e.target.value) || 0)}
                        className="w-full bg-gray-50 hover:bg-white border border-gray-200 rounded-xl p-2.5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
