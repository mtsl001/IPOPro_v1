

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, BarChart2, FileSearch, PieChart, Menu, Bell, LogOut, ChevronRight, Search, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/app' },
    { icon: <Calendar size={18} />, label: 'Calendar', path: '/app/calendar' },
    { icon: <FileSearch size={18} />, label: 'Forensic Analysis', path: '/app/analysis' },
    { icon: <BarChart2 size={18} />, label: 'Performance', path: '/app/performance' },
    { icon: <PieChart size={18} />, label: 'Premium Tools', path: '/app/premium' },
  ];

  // In a real app, check user.role === 'admin'
  const isAdmin = true; 

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* 
        SIDEBAR NAVIGATION 
      */}
      <aside className="w-64 bg-slate-900 hidden md:flex flex-col fixed h-full z-30 border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Link to="/app" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1 rounded-md">
              <BarChart2 className="text-white" size={16} />
            </div>
            <div>
               <h1 className="text-lg font-bold tracking-tight text-white leading-none">IPO<span className="text-blue-500">Insight</span></h1>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-2">Menu</div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </div>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            );
          })}

          {isAdmin && (
            <>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-6">Admin</div>
              <Link
                to="/app/admin"
                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === '/app/admin'
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-emerald-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} />
                  Admin Control
                </div>
              </Link>
            </>
          )}

        </nav>

        {/* User Plan Status */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 mb-3 border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-white text-sm">Pro Member</span>
              <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded border border-green-500/30">ACTIVE</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Access to full forensic reports enabled.</p>
            <button className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors border border-slate-600">
               Manage Subscription
            </button>
          </div>
          
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-slate-400 hover:text-red-400 text-xs font-medium px-2 transition-colors w-full py-1"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* 
        MAIN CONTENT AREA
      */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        {/* Glassmorphism Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 px-6 flex items-center justify-between transition-all">
          <div className="md:hidden">
            <Menu className="text-gray-600" />
          </div>
          
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
               <Search size={16} className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search IPOs, Red Flags, or Companies..." 
                 className="w-full bg-gray-100 hover:bg-gray-50 focus:bg-white border border-transparent focus:border-blue-200 rounded-xl px-10 py-2 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
               />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             
             <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
             
             <div className="flex items-center gap-3 pl-1">
                <div className="text-right hidden sm:block">
                  <span className="text-sm font-bold text-gray-900 block leading-tight">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                  <span className="text-[10px] text-gray-500 block leading-none font-medium uppercase tracking-wide">Pro Plan</span>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 border-2 border-white cursor-pointer hover:scale-105 transition-transform">
                  {user?.email ? user.email.substring(0, 1).toUpperCase() : 'U'}
                </div>
             </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
