
import React from 'react';
import { MOCK_IPOS } from '../constants';
import { IPO } from '../types';
import { Calendar as CalendarIcon, Clock, CheckCircle2, DollarSign, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CalendarEventProps {
  date: string;
  title: string;
  subtitle: string;
  type: 'open' | 'close' | 'listing' | 'allotment';
  isLast?: boolean;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ date, title, subtitle, type, isLast }) => {
  const typeStyles = {
    open: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: <Clock size={14} /> },
    close: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: <Clock size={14} /> },
    allotment: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: <Layers size={14} /> },
    listing: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', icon: <DollarSign size={14} /> },
  };

  const style = typeStyles[type];

  // Format date nicely
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });

  return (
    <div className="flex gap-4 relative">
      {/* Timeline Line */}
      {!isLast && <div className="absolute left-[1.15rem] top-10 bottom-0 w-0.5 bg-gray-200"></div>}

      {/* Date Bubble */}
      <div className="flex flex-col items-center justify-start min-w-[3rem]">
        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center z-10">
          <span className="text-xs font-bold text-gray-500 uppercase leading-none">{month}</span>
          <span className="text-lg font-black text-gray-900 leading-none">{day}</span>
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase mb-2 ${style.bg} ${style.text}`}>
                {style.icon}
                {type}
              </div>
              <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
            <Link to={`/app/analysis/${subtitle.toLowerCase().includes('boat') ? 'boat' : '1'}`} className="text-blue-600 text-xs font-semibold hover:underline">
              View Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CalendarPage = () => {
  // Flatten IPOs into a chronological list of events
  const events = MOCK_IPOS.flatMap(ipo => [
    { ipo, date: ipo.openDate, type: 'open' as const },
    { ipo, date: ipo.closeDate, type: 'close' as const },
    { ipo, date: ipo.allotmentDate, type: 'allotment' as const },
    { ipo, date: ipo.listingDate, type: 'listing' as const },
  ]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Filter out TBD dates
  const validEvents = events.filter(e => e.date !== 'TBD');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <CalendarIcon className="text-blue-600" />
          IPO Calendar & Timeline
        </h1>
        <p className="text-gray-500 mt-1">Track critical dates for subscription, allotment, and listing to manage your capital liquidity.</p>
      </div>

      <div className="mt-8">
        {validEvents.map((event, idx) => (
          <CalendarEvent
            key={`${event.ipo.id}-${event.type}`}
            date={event.date}
            title={event.ipo.name}
            subtitle={event.ipo.issueSize}
            type={event.type}
            isLast={idx === validEvents.length - 1}
          />
        ))}

        {validEvents.length === 0 && (
           <div className="p-10 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
             <p className="text-gray-500">No upcoming dates scheduled in the system.</p>
           </div>
        )}
      </div>
    </div>
  );
};
