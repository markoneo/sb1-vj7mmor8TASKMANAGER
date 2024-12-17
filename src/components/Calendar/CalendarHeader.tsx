import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth, onToday }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold">
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h2>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onToday}
          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          Today
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}