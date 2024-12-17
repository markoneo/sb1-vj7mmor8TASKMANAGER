import React, { useState } from 'react';
import { Task } from '../../types/task';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';

interface CalendarProps {
  tasks: Task[];
}

export function Calendar({ tasks }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => {
    const lastDayPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    return lastDayPrevMonth - firstDayOfMonth + i + 1;
  });

  const getTasksForDate = (day: number, isCurrentMonth: boolean = true) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.datetime);
      if (!isCurrentMonth) {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day);
        return (
          taskDate.getDate() === prevMonth.getDate() &&
          taskDate.getMonth() === prevMonth.getMonth() &&
          taskDate.getFullYear() === prevMonth.getFullYear()
        );
      }
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-2 bg-gray-50">
            <span className="text-sm font-medium text-gray-500">{day}</span>
          </div>
        ))}

        {previousMonthDays.map(day => (
          <CalendarDay
            key={`prev-${day}`}
            day={day}
            tasks={getTasksForDate(day, false)}
            isCurrentMonth={false}
          />
        ))}

        {days.map(day => (
          <CalendarDay
            key={day}
            day={day}
            tasks={getTasksForDate(day)}
            isCurrentMonth={true}
          />
        ))}
      </div>

      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-100 border border-green-200"></div>
          <span className="text-sm text-gray-600">Completed Tasks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div>
          <span className="text-sm text-gray-600">Future Tasks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-100 border border-gray-200"></div>
          <span className="text-sm text-gray-600">Past Tasks</span>
        </div>
      </div>
    </div>
  );
}