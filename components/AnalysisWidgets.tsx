
import React from 'react';
import { UseOfProceedsItem, PeerComparisonMetric, AnchorInvestor } from '../types';
import { Wallet, Scale, ArrowUpRight, ArrowDownRight, Minus, Briefcase, Lock } from 'lucide-react';

export const UseOfProceedsWidget = ({ data }: { data: UseOfProceedsItem[] }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 border-l-4 border-purple-600 pl-3">
        <Wallet size={18} className="text-purple-600" />
        Use of Proceeds
      </h3>
      <div className="space-y-5 flex-1">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className={`font-medium ${item.isRisk ? 'text-red-700' : 'text-gray-700'}`}>
                {item.category}
              </span>
              <span className="font-bold text-gray-900">{item.amount} ({item.percentage}%)</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`h-full rounded-full ${item.isRisk ? 'bg-red-500' : 'bg-purple-600'}`} 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            {item.description && <p className="text-xs text-gray-500 mt-1">{item.description}</p>}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <span className="font-bold text-gray-700">Analyst Note:</span>
          Allocations to "General Corporate Purposes" or "Working Capital" >25% are typically red flags indicating cash flow issues.
        </div>
      </div>
    </div>
  );
};

export const PeerComparisonWidget = ({ data }: { data: PeerComparisonMetric[] }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col overflow-hidden">
      <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 border-l-4 border-blue-600 pl-3">
        <Scale size={18} className="text-blue-600" />
        Peer Benchmarking
      </h3>
      
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left whitespace-nowrap md:whitespace-normal">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="py-2 px-3 pl-1">Metric</th>
              <th className="py-2 px-3">Company</th>
              <th className="py-2 px-3">Peer Avg</th>
              <th className="py-2 px-3 text-right">Verdict</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-3 pl-1 font-medium text-gray-700">{row.metric}</td>
                <td className="py-3 px-3 font-bold text-gray-900">{row.companyValue}</td>
                <td className="py-3 px-3 text-gray-500">{row.peerAverage}</td>
                <td className="py-3 px-3 text-right">
                  {row.status === 'Better' && <span className="inline-flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-bold"><ArrowUpRight size={12} className="mr-1"/> Better</span>}
                  {row.status === 'Worse' && <span className="inline-flex items-center text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs font-bold"><ArrowDownRight size={12} className="mr-1"/> Worse</span>}
                  {row.status === 'Neutral' && <span className="inline-flex items-center text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-xs font-bold"><Minus size={12} className="mr-1"/> Neutral</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AnchorInvestorWidget = ({ data }: { data: AnchorInvestor[] }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 border-l-4 border-emerald-600 pl-3">
            <Briefcase size={18} className="text-emerald-600" />
            Anchor Investor Intelligence
        </h3>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{data.length} Funds</span>
      </div>
      
      {/* Container for responsive table with fixed height */}
      <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
            <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm text-left min-w-[600px]">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                    <tr>
                    <th className="py-3 px-4 pl-4 whitespace-nowrap bg-gray-50">Fund Name</th>
                    <th className="py-3 px-4 whitespace-nowrap bg-gray-50">Category</th>
                    <th className="py-3 px-4 whitespace-nowrap bg-gray-50">Amount</th>
                    <th className="py-3 px-4 whitespace-nowrap bg-gray-50">Lock-in End</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 pl-4">
                        <div className="font-bold text-gray-900 truncate max-w-[200px]" title={row.name}>{row.name}</div>
                        <div className="flex gap-2 mt-1">
                            {row.tier === 1 && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Tier 1</span>}
                            {row.tier === 2 && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Tier 2</span>}
                            {row.tier === 3 && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase tracking-wider">Tier 3</span>}
                        </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{row.category}</td>
                        <td className="py-3 px-4 font-mono font-medium whitespace-nowrap">{row.amount}</td>
                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                            <Lock size={12} className="text-gray-400" />
                            {row.lockInEnd}
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};
