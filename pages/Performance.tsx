
import React from 'react';
import { MOCK_LISTED_PERFORMANCE } from '../constants';
import { Recommendation } from '../types';
import { BarChart2, TrendingUp, TrendingDown, DollarSign, ArrowUpRight } from 'lucide-react';

export const PerformancePage = () => {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <BarChart2 className="text-blue-600" />
          IPO Listing Performance
        </h1>
        <p className="text-gray-500 mt-1">
          Track the performance of recent IPOs from listing day to current market price (CMP). 
          See if "money was left on the table" or if holding was the right strategy.
        </p>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Avg Listing Gain</p>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-green-600">+41.8%</span>
                <span className="text-xs text-gray-400 mb-1">Across tracked IPOs</span>
            </div>
         </div>
         <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Top Performer</p>
            <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">Bajaj Housing</span>
                <span className="text-sm text-green-600 font-medium">+135.7% Returns</span>
            </div>
         </div>
         <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Recommendation Accuracy</p>
            <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-blue-600">80%</span>
                <span className="text-xs text-gray-400">Success Rate</span>
            </div>
         </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="py-4 px-6">Company</th>
                <th className="py-4 px-6">Listing Date</th>
                <th className="py-4 px-6">Issue Price</th>
                <th className="py-4 px-6">Listing Price</th>
                <th className="py-4 px-6">CMP</th>
                <th className="py-4 px-6">List Gain %</th>
                <th className="py-4 px-6">Total Gain %</th>
                <th className="py-4 px-6 text-right">Our Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_LISTED_PERFORMANCE.map((ipo) => (
                <tr key={ipo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{ipo.name}</div>
                    <div className="text-xs text-gray-500">{ipo.sector}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{ipo.listingDate}</td>
                  <td className="py-4 px-6 font-mono">₹{ipo.issuePrice}</td>
                  <td className="py-4 px-6 font-mono text-gray-700">₹{ipo.listingPrice}</td>
                  <td className="py-4 px-6 font-mono font-bold text-gray-900">₹{ipo.cmp}</td>
                  <td className="py-4 px-6">
                    <span className={`font-bold ${ipo.listingGainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {ipo.listingGainPercent > 0 ? '+' : ''}{ipo.listingGainPercent}%
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                        <span className={`font-black ${ipo.currentGainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {ipo.currentGainPercent > 0 ? '+' : ''}{ipo.currentGainPercent}%
                        </span>
                        {ipo.currentGainPercent > ipo.listingGainPercent && (
                            <ArrowUpRight size={14} className="text-green-500" />
                        )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className={`
                      inline-block px-2 py-1 text-xs font-bold rounded border
                      ${ipo.verdictWas === Recommendation.STRONG_APPLY ? 'bg-green-100 text-green-800 border-green-200' : 
                        ipo.verdictWas === Recommendation.MODERATE_APPLY ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        ipo.verdictWas === Recommendation.CAUTIOUS ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'}
                    `}>
                      {ipo.verdictWas}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
