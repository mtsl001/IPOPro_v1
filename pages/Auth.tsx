import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BarChart2, Loader2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/app', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // Depending on Supabase settings, email confirmation might be required.
        // For this demo, we assume auto-login or redirect.
        if (!error) {
           navigate('/app');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/app');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="text-blue-600 animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SIDE: Brand Showcase (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600 rounded-full blur-[100px] opacity-10 -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <div className="bg-blue-600 p-1.5 rounded-lg">
                <BarChart2 className="text-white" size={20} />
             </div>
             <span className="text-xl font-bold tracking-tight">IPO Insight Pro</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
           <h2 className="text-4xl font-bold mb-6 leading-tight">
             Stop gambling on IPOs. <br/>
             <span className="text-blue-400">Start analyzing.</span>
           </h2>
           <div className="space-y-4 mb-8">
              <FeatureRow text="Access institutional-grade forensic reports" />
              <FeatureRow text="Track Grey Market Premium (GMP) trends" />
              <FeatureRow text="Spot red flags in financial statements" />
           </div>
           
           <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
              <p className="text-slate-300 italic text-sm mb-3">
                "This tool saved me from investing in a hype-driven IPO that crashed 40% on listing day. The forensic analysis is gold."
              </p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xs">RK</div>
                 <div>
                    <div className="text-sm font-bold">Rahul K.</div>
                    <div className="text-xs text-slate-500">Early Access Member</div>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="relative z-10 text-xs text-slate-500">
           © 2025 IPO Insight Pro. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 lg:bg-white">
        <div className="w-full max-w-md">
          <div className="bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl shadow-xl lg:shadow-none border lg:border-none border-gray-100">
            
            <div className="text-center lg:text-left mb-8">
              <div className="lg:hidden flex justify-center mb-4">
                 <div className="bg-blue-600 p-2 rounded-xl">
                    <BarChart2 className="text-white" size={24} />
                 </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === 'login' ? 'Welcome back' : 'Create an account'}
              </h1>
              <p className="text-gray-500">
                {mode === 'login' 
                  ? 'Enter your details to access your dashboard.' 
                  : 'Start your 14-day free trial. No credit card required.'}
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-start gap-3 border border-red-100">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-red-600" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Get Started'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account yet?" : "Already have an account?"}
                <button 
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login');
                    setError(null);
                  }} 
                  className="ml-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
                >
                  {mode === 'login' ? 'Sign up for free' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureRow = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 text-slate-300">
    <CheckCircle2 className="text-blue-500 flex-shrink-0" size={20} />
    <span className="text-sm font-medium">{text}</span>
  </div>
);