
import React, { useState, useMemo } from 'react';
import { MOCK_VALUATION_DATA, ANALYSIS_REPORTS, MOCK_IPOS } from '../constants';
import { ValuationScatterChart } from '../components/PremiumCharts';
import { Crown, TrendingUp, Target, BookOpen, ChevronRight, FileText, Download, Printer, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const PremiumTools = () => {
  const [selectedIpoId, setSelectedIpoId] = useState('boat');
  const [activeSection, setActiveSection] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter IPOs that have a report available
  const availableReports = MOCK_IPOS.filter(ipo => ANALYSIS_REPORTS[ipo.id]);
  
  // Filter reports based on search
  const filteredReports = availableReports.filter(ipo => 
    ipo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ipo.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAnalysis = ANALYSIS_REPORTS[selectedIpoId];

  // -- Robust Markdown Parsing Logic --
  const reportSections = useMemo(() => {
    if (!currentAnalysis?.fullReportMarkdown) return [];

    // Split by level 2 headers (## ) which denote main sections
    // This regex looks for a line starting with '## '
    const rawParts = currentAnalysis.fullReportMarkdown.split(/(?=^## )/m);

    const sections = rawParts
      .map((part) => {
        const trimmed = part.trim();
        if (!trimmed) return null;
        
        // Skip H1 preamble (document title) if it's just the title and no content
        // This prevents the first tab being just the title "FORENSIC ANALYSIS..."
        if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) return null;

        // Extract Title from H2 header
        // Match line starting with ## until end of line
        const titleMatch = trimmed.match(/^## (.*)$/m);
        let title = 'Section';
        
        if (titleMatch) {
            // Clean up title (remove markdown bolding **, etc)
            title = titleMatch[1].replace(/\*\*/g, '').replace(/\*/g, '').trim();
            // Remove "PART X:" prefix for cleaner tabs if desired, but keeping it is also fine
            // Let's keep it but remove the ## from the content so we don't render title twice
        } else {
            // If for some reason we have content without a header (unlikely with split), default to Intro
            title = 'Introduction';
        }

        return { title, content: trimmed };
      })
      .filter((s): s is { title: string; content: string } => s !== null);

    return sections;
  }, [currentAnalysis]);

  // Reset active section when changing reports
  React.useEffect(() => {
    setActiveSection(0);
  }, [selectedIpoId]);

  return (
    <div className="max-w-7xl mx-auto pb-12">
      
      {/* Hero Header */}
      <div className="bg-slate-900 rounded-2xl p-8 mb-10 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold uppercase tracking-wider text-xs">
            <Crown size={14} /> Premium Intelligence
          </div>
          <h1 className="text-3xl font-bold mb-2">Institutional Grade Analysis</h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Access the tools fund managers use. Analyze valuation vs growth matrix, track institutional momentum, and read forensic deep-dives.
          </p>
        </div>
        {/* Abstract Background Shapes */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-10 -ml-20 -mb-20"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Tool 1: Valuation DNA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Target size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Valuation DNA Matrix</h3>
                <p className="text-xs text-gray-500">P/E vs. Growth relative to peers</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold animate-pulse">LIVE</span>
          </div>

          <div className="flex-1 min-h-[300px]">
            <ValuationScatterChart data={MOCK_VALUATION_DATA} />
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-600">
             <strong>Analyst Tip:</strong> Companies below the red dotted line offer better <span className="text-green-600 font-bold">Growth at a Reasonable Price (GARP)</span> compared to the sector average.
          </div>
        </div>

        {/* Tool 2: GMP Volatility Scanner */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">GMP Volatility Scanner</h3>
                <p className="text-xs text-gray-500">Real-time grey market anomalies</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
               {[
                 { name: 'NovaTech Ltd', change: '+15%', trend: 'up', price: '₹120' },
                 { name: 'GreenEnergy Power', change: '+2%', trend: 'flat', price: '₹40' },
                 { name: 'Sudeep Pharma', change: '-5%', trend: 'down', price: '₹15' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">Current GMP: {item.price}</div>
                    </div>
                    <div className={`text-sm font-bold px-2 py-1 rounded ${
                      item.trend === 'up' ? 'bg-green-100 text-green-700' : 
                      item.trend === 'down' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.change}
                    </div>
                 </div>
               ))}
            </div>
             <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-600">
             <strong>Alert:</strong> Sudden GMP drops >10% usually indicate HNI funding withdrawal.
          </div>
        </div>
      </div>

      {/* RESEARCH LIBRARY SECTION */}
      <div id="research-library" className="scroll-mt-24">
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-3">
             <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
               <BookOpen size={24} />
             </div>
             <div>
               <h2 className="text-2xl font-bold text-gray-900">Forensic Research Library</h2>
               <p className="text-gray-500 text-sm">Unabridged 30-page analyst reports</p>
             </div>
           </div>
        </div>

        {/* DOCUMENT VIEWER CONTAINER */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[800px]">
          
          {/* SIDEBAR: Report Selector & TOC */}
          <div className="w-full md:w-80 bg-gray-50 border-r border-gray-200 flex flex-col flex-shrink-0">
            
            {/* Search Box */}
            <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Find report..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* List of Reports */}
            <div className="p-2 border-b border-gray-200 bg-gray-50 max-h-48 overflow-y-auto">
              <div className="space-y-1">
                {filteredReports.map(ipo => (
                   <button
                     key={ipo.id}
                     onClick={() => { setSelectedIpoId(ipo.id); }}
                     className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-all border ${
                       selectedIpoId === ipo.id 
                         ? 'bg-white border-gray-200 shadow-sm' 
                         : 'hover:bg-gray-100 border-transparent text-gray-500'
                     }`}
                   >
                     <div className={`w-8 h-8 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-xs ${
                       selectedIpoId === ipo.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                     }`}>
                        {ipo.symbol.substring(0, 1)}
                     </div>
                     <div className="min-w-0">
                       <div className={`font-bold text-sm truncate ${selectedIpoId === ipo.id ? 'text-gray-900' : 'text-gray-600'}`}>{ipo.symbol}</div>
                       <div className="text-[10px] text-gray-400 truncate">{ipo.sector}</div>
                     </div>
                   </button>
                ))}
                {filteredReports.length === 0 && (
                  <div className="text-center py-4 text-xs text-gray-400">No reports found</div>
                )}
              </div>
            </div>

            {/* Table of Contents for Selected Report */}
            <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
               <div className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider sticky top-0 bg-gray-50 backdrop-blur-sm z-10 border-b border-gray-100 flex items-center gap-2">
                 <FileText size={12} /> Table of Contents
               </div>
               <div className="p-2 space-y-0.5">
                 {reportSections.map((section, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSection(idx)}
                      className={`
                        w-full text-left px-3 py-2.5 text-xs rounded-md transition-all flex items-center justify-between group
                        ${activeSection === idx 
                          ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                      `}
                    >
                      <div className="flex items-start gap-2.5">
                         <span className={`text-[10px] w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 ${activeSection === idx ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-500'}`}>
                           {idx + 1}
                         </span>
                         <span className="line-clamp-2 leading-relaxed">{section.title}</span>
                      </div>
                      {activeSection === idx && <ChevronRight size={14} />}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 bg-white flex flex-col h-full overflow-hidden relative">
             {/* Toolbar */}
             <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-bold text-gray-900">Last Updated:</span> Oct 12, 2025
                </div>
                <div className="flex gap-2">
                   <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded" title="Print Report">
                     <Printer size={16} />
                   </button>
                   <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded" title="Download PDF">
                     <Download size={16} />
                   </button>
                </div>
             </div>

             {/* Scrollable Document Content */}
             <div className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth bg-white">
                {currentAnalysis ? (
                  <div className="max-w-3xl mx-auto min-h-full pb-20">
                    <div className="mb-8 pb-6 border-b border-gray-100">
                        <div className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                          Forensic Deep Dive
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2">
                          {currentAnalysis.ipoId === 'boat' ? 'boAt (Imagine Marketing Ltd)' : currentAnalysis.ipoId === 'sudeep' ? 'Sudeep Pharma Limited' : 'Analysis Report'}
                        </h2>
                        <h3 className="text-xl text-gray-500 font-medium">
                          {reportSections[activeSection]?.title}
                        </h3>
                    </div>
                    
                    <div className="markdown-body prose prose-indigo max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900 prose-table:text-sm">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {reportSections[activeSection]?.content || ''}
                      </ReactMarkdown>
                    </div>

                    {/* Navigation Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between">
                       <button 
                         disabled={activeSection === 0}
                         onClick={() => setActiveSection(prev => prev - 1)}
                         className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                       >
                         Previous Section
                       </button>
                       <button 
                         disabled={activeSection === reportSections.length - 1}
                         onClick={() => setActiveSection(prev => prev + 1)}
                         className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                       >
                         Next Section <ChevronRight size={16} />
                       </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300">
                     <FileText size={64} className="mb-4 text-gray-200" />
                     <p className="text-lg font-medium text-gray-400">Select a report to start analyzing</p>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
