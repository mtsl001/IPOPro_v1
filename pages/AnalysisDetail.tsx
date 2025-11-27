
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ANALYSIS_REPORTS, MOCK_IPOS } from '../constants';
import { RedFlagDashboard } from '../components/RedFlagDashboard';
import { FinancialScorecard } from '../components/FinancialScorecard';
import { UseOfProceedsWidget, PeerComparisonWidget, AnchorInvestorWidget } from '../components/AnalysisWidgets';
import { NewsFeed } from '../components/NewsFeed';
import { SentimentMeter } from '../components/SentimentMeter';
import { ArrowLeft, CheckCircle, AlertOctagon, Download, Crown, Lock } from 'lucide-react';

/**
 * AnalysisDetail Component
 * 
 * Displays the public summary analysis of an IPO.
 * The full "Deep Dive" is now locked behind the Premium Tools page.
 */
export const AnalysisDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // Effect to simulate data fetching and ensure page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  const ipo = MOCK_IPOS.find(i => i.id === id);
  const analysis = id ? ANALYSIS_REPORTS[id] : null;

  // -- Loading State --
  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-gray-500 flex-col gap-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p>Loading forensic analysis...</p>
      </div>
    );
  }

  // -- Error State --
  if (!ipo || !analysis) {
    return (
      <div className="p-10 text-center space-y-4">
        <div className="text-red-500 font-medium text-lg">Analysis not found for this IPO.</div>
        <p className="text-gray-500">The forensic report might be pending or the ID is incorrect.</p>
        <Link to="/app" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const verdictColor = analysis.verdictScore > 50 ? 'text-green-400' : analysis.verdictScore > 30 ? 'text-yellow-400' : 'text-red-400';
  const verdictBg = analysis.verdictScore > 50 ? 'bg-green-500' : analysis.verdictScore > 30 ? 'bg-yellow-500' : 'bg-red-600';

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-6">
      
      {/* 1. HEADER SECTION */}
      <div>
        <Link to="/app" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-4 text-sm font-medium transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">{ipo.name}</h1>
              <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${ipo.recommendation === 'Avoid' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                {ipo.recommendation}
              </span>
            </div>
            <p className="text-gray-500 mt-1">Sector: {ipo.sector} • Issue Size: {ipo.issueSize}</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm transition-colors">
             <Download size={16} /> Download Summary
          </button>
        </div>
      </div>

      {/* 2. ALGORITHMIC VERDICT BANNER (COMPACT) */}
      <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch">
          
          {/* Left: Score Panel */}
          <div className="bg-slate-950 p-6 md:w-64 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 relative flex-shrink-0">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quality Score</span>
             <div className={`text-5xl font-black ${verdictColor} tracking-tighter`}>{analysis.verdictScore}</div>
             <div className="text-[10px] text-slate-500 mt-1 font-medium mb-3">out of 100</div>
             
             {/* Simple Risk Bar */}
             <div className="w-full max-w-[120px] h-1.5 bg-slate-800 rounded-full relative overflow-hidden">
                <div className={`h-full ${verdictBg} rounded-full`} style={{ width: `${analysis.verdictScore}%` }}></div>
             </div>
             <div className="flex justify-between w-full max-w-[120px] text-[9px] text-slate-600 mt-1 uppercase font-bold">
               <span>Risk</span>
               <span>Safe</span>
             </div>
          </div>

          {/* Right: Verdict Text */}
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-3">
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
               <h2 className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">Analyst Verdict</h2>
             </div>
             <p className="text-xl md:text-2xl font-light text-white leading-tight italic">
              "{analysis.verdictText}"
             </p>
             <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 font-medium">Risk Rating: 8/10</span>
                <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 font-medium">Forensic Check: Complete</span>
             </div>
          </div>
        </div>
      </div>

      {/* 3. SNAPSHOT ROW (Scorecard + Quick Take) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Financial Scorecard */}
         <FinancialScorecard score={analysis.financialScore} />
         
         {/* Strengths & Risks */}
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
             <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 border-l-4 border-gray-900 pl-3">
               Quick Take
             </h3>
             <div className="space-y-4 flex-1">
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-green-700 mb-2 text-xs uppercase tracking-wide">
                    <CheckCircle size={14} /> Key Strengths
                  </h4>
                  <ul className="space-y-2">
                    {analysis.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-gray-600 pl-3 border-l-2 border-green-200 py-0.5">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <h4 className="flex items-center gap-2 font-bold text-red-700 mb-2 text-xs uppercase tracking-wide">
                    <AlertOctagon size={14} /> Critical Risks
                  </h4>
                  <ul className="space-y-2">
                    {analysis.risks.map((r, i) => (
                      <li key={i} className="text-sm text-gray-600 pl-3 border-l-2 border-red-200 py-0.5">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
         </div>
      </div>

      {/* 4. NEW ANALYTICS ROW: News & Sentiment */}
      {ipo.news && ipo.news.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Sentiment Meter (1 col) */}
           <div className="md:col-span-1">
             <SentimentMeter score={ipo.marketSentiment} />
           </div>
           
           {/* News Feed (2 cols) */}
           <div className="md:col-span-2">
             <NewsFeed news={ipo.news} />
           </div>
        </div>
      )}

      {/* 5. NEW ANALYTICS ROW: Use of Proceeds & Peer Comparison */}
      {(analysis.useOfProceeds || analysis.peerComparison) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysis.useOfProceeds && <UseOfProceedsWidget data={analysis.useOfProceeds} />}
          {analysis.peerComparison && <PeerComparisonWidget data={analysis.peerComparison} />}
        </div>
      )}
      
      {/* 6. ANCHOR INVESTORS (Full Width) */}
      {analysis.anchorInvestors && (
        <div>
           <AnchorInvestorWidget data={analysis.anchorInvestors} />
        </div>
      )}

      {/* 7. RED FLAG DASHBOARD (Full Width) */}
      <div>
        <RedFlagDashboard redFlags={analysis.redFlags} />
      </div>

      {/* 8. PREMIUM LOCK BANNER (Replaces Deep Dive Viewer) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-lg border border-slate-700 p-8 text-center text-white relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/10 p-4 rounded-full mb-4 backdrop-blur-sm">
            <Lock size={32} className="text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Unlock Forensic Deep Dive</h2>
          <p className="text-slate-300 max-w-lg mx-auto mb-6">
            Access the full unabridged 30-page forensic report, including Part 5 (Valuation), Part 6 (Scenario Analysis), and the "What They're Not Telling You" section.
          </p>
          <Link to="/app/premium" className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-yellow-500/20">
            <Crown size={18} />
            View in Premium Tools
          </Link>
        </div>
        {/* Background decoration */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

    </div>
  );
};
