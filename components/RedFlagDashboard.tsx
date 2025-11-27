import React, { useState } from 'react';
import { RedFlag, RedFlagSeverity, RedFlagCategory } from '../types';
import { AlertTriangle, ChevronDown, ChevronUp, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface RedFlagDashboardProps {
  redFlags: RedFlag[];
}

/**
 * Helper component to render severity badges with appropriate colors.
 */
const SeverityBadge = ({ severity }: { severity: RedFlagSeverity }) => {
  const colors = {
    [RedFlagSeverity.CRITICAL]: 'bg-red-100 text-red-800 border-red-200',
    [RedFlagSeverity.HIGH]: 'bg-orange-100 text-orange-800 border-orange-200',
    [RedFlagSeverity.MEDIUM]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [RedFlagSeverity.LOW]: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${colors[severity]}`}>
      {severity.toUpperCase()}
    </span>
  );
};

/**
 * RedFlagDashboard Component
 * 
 * Displays a summarized dashboard of all red flags detected in the DRHP.
 * Updated to look good in a full-width container.
 */
export const RedFlagDashboard: React.FC<RedFlagDashboardProps> = ({ redFlags }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Calculate stats for the header
  const criticalCount = redFlags.filter(r => r.severity === RedFlagSeverity.CRITICAL).length;
  const highCount = redFlags.filter(r => r.severity === RedFlagSeverity.HIGH).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* 1. Header Summary Section */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="text-red-600" size={24} />
            <h2 className="text-lg font-bold text-gray-900">Forensic Red Flag Scanner</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Automated + Expert analysis of DRHP across 7 distinct risk categories.
          </p>
        </div>
        
        {/* Severity Counters */}
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-lg border border-red-100 min-w-[100px]">
            <span className="text-2xl font-bold text-red-700">{criticalCount}</span>
            <div className="leading-tight">
              <span className="text-[10px] font-bold text-red-600 uppercase block">Critical</span>
              <span className="text-[10px] text-red-500 uppercase">Issues</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-lg border border-orange-100 min-w-[100px]">
            <span className="text-2xl font-bold text-orange-700">{highCount}</span>
             <div className="leading-tight">
              <span className="text-[10px] font-bold text-orange-600 uppercase block">High</span>
              <span className="text-[10px] text-orange-500 uppercase">Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Detailed List Accordion */}
      <div className="divide-y divide-gray-100">
        {redFlags.map((flag) => (
          <div key={flag.id} className="transition-colors hover:bg-gray-50 group">
            {/* Clickable Header */}
            <div 
              className="p-4 cursor-pointer flex items-center gap-4"
              onClick={() => toggleExpand(flag.id)}
            >
              <div className={`flex-shrink-0 mt-1 ${flag.severity === RedFlagSeverity.CRITICAL ? 'text-red-500' : 'text-yellow-500'}`}>
                <AlertTriangle size={20} />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{flag.category}</span>
                   <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
                   <h4 className="text-sm font-semibold text-gray-900">{flag.title}</h4>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1 md:line-clamp-none">{flag.description}</p>
              </div>

              <div className="flex items-center gap-4">
                 <SeverityBadge severity={flag.severity} />
                 <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                   {expandedId === flag.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                 </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === flag.id && (
              <div className="px-4 pb-4 pl-[3.25rem]">
                <div className="bg-gray-50 rounded-lg p-5 text-sm space-y-4 border border-gray-200">
                  <div>
                    <span className="font-bold text-gray-800 block mb-1">Detailed Analysis:</span>
                    <p className="text-gray-700 leading-relaxed">{flag.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <span className="font-bold text-gray-800 block mb-1">Evidence Source:</span>
                      <div className="flex items-center gap-2">
                         <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                         <p className="text-blue-700 font-mono text-xs bg-blue-50 px-2 py-1 rounded border border-blue-100">
                            {flag.evidence}
                         </p>
                      </div>
                    </div>
                     {flag.mitigation && (
                      <div>
                        <span className="font-bold text-gray-800 block mb-1">Mitigation Factor:</span>
                         <div className="flex items-start gap-2 bg-green-50 p-2 rounded border border-green-100">
                            <CheckCircle2 size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 text-xs leading-relaxed">{flag.mitigation}</p>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};