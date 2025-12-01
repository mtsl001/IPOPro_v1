
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  LayoutDashboard, Plus, Save, Bot, FileText, 
  Database, RefreshCw, CheckCircle, AlertCircle, X, Loader2 
} from 'lucide-react';
import { IPO, IPOStatus, AnalysisReport, RedFlagSeverity, RedFlagCategory } from '../types';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [loading, setLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<string>('');
  
  // Form State for a New IPO
  const [formData, setFormData] = useState<Partial<IPO>>({
    name: '',
    symbol: '',
    sector: '',
    status: IPOStatus.UPCOMING,
    priceBand: '',
    issueSize: '',
    lotSize: 0,
    marketSentiment: 50,
    gmp: 0
  });

  const [analysisData, setAnalysisData] = useState<Partial<AnalysisReport>>({
    summary: '',
    verdictText: '',
    verdictScore: 50,
    strengths: [],
    risks: [],
    fullReportMarkdown: ''
  });

  // RAW INPUTS FOR AI
  const [rawText, setRawText] = useState('');

  // --- AI EXTRACTION LOGIC ---
  const handleAIExtraction = async (type: 'BASIC' | 'ANALYSIS') => {
    if (!rawText) return;
    setLoading(true);
    setAiStatus('Analyzing text with Gemini...');

    try {
      const model = 'gemini-2.5-flash';
      let prompt = '';

      if (type === 'BASIC') {
        prompt = `
          Extract IPO details from the following text (likely from a DRHP or news site like GainIPO).
          Return ONLY a JSON object with these keys:
          name, symbol, sector, priceBand, issueSize, lotSize (number), openDate (YYYY-MM-DD), closeDate, listingDate.
          
          Text:
          ${rawText}
        `;
      } else {
        prompt = `
          Extract Forensic Analysis details from the following report text.
          Return ONLY a JSON object with these keys:
          summary (short paragraph), 
          verdictText (punchline), 
          verdictScore (0-100 number),
          strengths (array of strings),
          risks (array of strings),
          financialScore (object with keys: profitability, cashFlow, balanceSheet, growth, governance, valuation, total - all numbers 0-100).

          Text:
          ${rawText}
        `;
      }

      const result = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const extracted = JSON.parse(result.text || '{}');
      
      if (type === 'BASIC') {
        setFormData(prev => ({ ...prev, ...extracted }));
        setAiStatus('Basic details extracted successfully!');
      } else {
        setAnalysisData(prev => ({ ...prev, ...extracted }));
        setAiStatus('Analysis data extracted successfully!');
      }

    } catch (err) {
      console.error(err);
      setAiStatus('Error extracting data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call supabase.from('ipos').insert(...)
    alert("In a real environment, this would save to Supabase!");
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="bg-slate-900 text-white p-8 rounded-2xl mb-8 shadow-xl">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Database className="text-blue-500" />
          Admin Control Center
        </h1>
        <p className="text-slate-400 mt-2">
          Manage IPO Master Data, Run AI Extractions, and Publish Forensic Reports.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: AI Extraction Tool */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold uppercase tracking-wider text-xs">
              <Bot size={16} /> AI Data Extractor
            </div>
            
            <p className="text-xs text-gray-500 mb-4">
              Paste content from GainIPO, DRHP PDFs, or News articles below to auto-fill the forms.
            </p>

            <textarea
              className="w-full h-64 p-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4 font-mono"
              placeholder="Paste raw text here..."
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />

            <div className="space-y-2">
              <button
                onClick={() => handleAIExtraction('BASIC')}
                disabled={loading || !rawText}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                Extract Basic Info
              </button>
              <button
                onClick={() => handleAIExtraction('ANALYSIS')}
                disabled={loading || !rawText}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <FileText size={16} />}
                Extract Analysis
              </button>
            </div>

            {aiStatus && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg flex items-center gap-2">
                 <CheckCircle size={14} /> {aiStatus}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Data Entry Forms */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">IPO Master Record</h3>
              <div className="flex gap-2">
                <button type="button" className="px-4 py-2 text-sm text-gray-600 font-medium hover:bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Save size={16} /> Save to Database
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded-lg font-bold text-gray-900" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Symbol</label>
                <input 
                  type="text" 
                  value={formData.symbol}
                  onChange={e => setFormData({...formData, symbol: e.target.value})}
                  className="w-full p-2 border rounded-lg font-mono" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sector</label>
                <input 
                  type="text" 
                  value={formData.sector}
                  onChange={e => setFormData({...formData, sector: e.target.value})}
                  className="w-full p-2 border rounded-lg" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price Band</label>
                <input 
                  type="text" 
                  value={formData.priceBand}
                  onChange={e => setFormData({...formData, priceBand: e.target.value})}
                  className="w-full p-2 border rounded-lg" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Issue Size</label>
                <input 
                  type="text" 
                  value={formData.issueSize}
                  onChange={e => setFormData({...formData, issueSize: e.target.value})}
                  className="w-full p-2 border rounded-lg" 
                />
              </div>
              
              <div className="col-span-2 pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle size={16} className="text-orange-500" />
                  Forensic Analysis Data
                </h4>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Verdict Punchline</label>
                <input 
                  type="text" 
                  value={analysisData.verdictText}
                  onChange={e => setAnalysisData({...analysisData, verdictText: e.target.value})}
                  className="w-full p-2 border rounded-lg text-lg text-red-600 font-bold" 
                />
              </div>

              <div className="col-span-2">
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Executive Summary</label>
                 <textarea 
                    value={analysisData.summary}
                    onChange={e => setAnalysisData({...analysisData, summary: e.target.value})}
                    className="w-full p-2 border rounded-lg h-24 text-sm"
                 />
              </div>

              <div className="col-span-2">
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Markdown Report</label>
                 <textarea 
                    value={analysisData.fullReportMarkdown}
                    onChange={e => setAnalysisData({...analysisData, fullReportMarkdown: e.target.value})}
                    className="w-full p-3 border rounded-lg h-64 font-mono text-xs bg-gray-50"
                    placeholder="# Markdown content goes here..."
                 />
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
