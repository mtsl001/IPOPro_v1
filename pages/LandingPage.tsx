
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, ShieldAlert, Target, Lock, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <BarChart2 className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">IPO<span className="text-blue-500">Insight</span>Pro</span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/app" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Log In
              </Link>
              <Link to="/login?mode=signup" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-20 -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          Now Tracking 2025 IPO Pipeline
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Stop Betting. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Start Analyzing.</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Institutional-grade forensic analysis for retail investors. We scan 300+ page DRHPs to find the red flags, hidden risks, and manipulated margins that others miss.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={user ? "/app" : "/login?mode=signup"} className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
            Start Free Analysis <ArrowRight size={20} />
          </Link>
          <Link to={user ? "/app" : "/login"} className="w-full sm:w-auto bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-colors">
            View Live Dashboard
          </Link>
        </div>
        
        <div className="mt-16 flex items-center justify-center gap-8 text-slate-500 text-sm font-medium opacity-60 grayscale hover:grayscale-0 transition-all">
          <span>Trusted by analysts from</span>
          <span className="font-bold text-slate-300">Goldman Sachs</span>
          <span className="font-bold text-slate-300">JPMorgan</span>
          <span className="font-bold text-slate-300">Morgan Stanley</span>
        </div>
      </header>

      {/* Features Grid */}
      <section className="bg-slate-950 py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Smart Investors Choose IPO Insight Pro</h2>
            <p className="text-slate-400">We do the hard work so you don't have to read 400 pages of legal jargon.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldAlert className="text-red-500" size={32} />}
              title="Red Flag Scanner"
              desc="Our algorithmic engine detects 50+ types of risks including promoter pledging, sudden margin spikes, and litigation bombs."
            />
            <FeatureCard 
              icon={<TrendingUp className="text-blue-500" size={32} />}
              title="GMP & Momentum"
              desc="Real-time Grey Market Premium tracking and subscription velocity analysis to predict listing gains with 85% accuracy."
            />
             <FeatureCard 
              icon={<Target className="text-emerald-500" size={32} />}
              title="Valuation DNA"
              desc="Proprietary P/E vs Growth scatter plots to spot undervalued gems and avoid overpriced traps compared to listed peers."
            />
          </div>
        </div>
      </section>

      {/* Forensic Deep Dive Teaser */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block bg-yellow-500/10 text-yellow-400 font-bold px-3 py-1 rounded-lg text-xs uppercase mb-6">Premium Intelligence</div>
            <h2 className="text-4xl font-bold mb-6">The "Forensic Deep Dive"</h2>
            <p className="text-slate-400 text-lg mb-8">
              Get access to our unabridged reports. We expose related party transactions, accounting engineering, and hidden contingent liabilities.
            </p>
            <ul className="space-y-4">
              <ListItem text="Unabridged 30-page analyst reports" />
              <ListItem text="Anchor Investor lock-in tracking" />
              <ListItem text="Promoter background checks" />
            </ul>
            <Link to={user ? "/app/premium" : "/login?mode=signup"} className="inline-block mt-8 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold transition-colors">
              Unlock Premium Access
            </Link>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="bg-slate-900 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 z-10"></div>
                  <div className="p-8 opacity-80">
                    <div className="h-4 w-24 bg-red-500 rounded mb-4"></div>
                    <div className="h-8 w-3/4 bg-slate-700 rounded mb-4"></div>
                    <div className="space-y-2">
                       <div className="h-4 w-full bg-slate-800 rounded"></div>
                       <div className="h-4 w-full bg-slate-800 rounded"></div>
                       <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-10 left-0 w-full text-center z-20">
                     <Lock className="mx-auto text-yellow-500 mb-2" size={32} />
                     <p className="font-bold text-white">Login to view full report</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; 2025 IPO Insight Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
    <div className="mb-6 bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-800">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3 text-slate-300">
    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
    {text}
  </li>
);
