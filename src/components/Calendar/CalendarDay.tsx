import React from 'react';
import { Task } from '../../types/task';
import { CalendarTask } from './CalendarTask';

interface CalendarDayProps {
  day: number;
  tasks: Task[];
  isCurrentMonth: boolean;
}

export function CalendarDay({ day, tasks, isCurrentMonth }: CalendarDayProps) {
  return (
    <div className={`min-h-[120px] bg-white p-2 ${!isCurrentMonth && 'bg-gray-50'}`}>
      <span className={`text-sm font-medium ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}`}>
        {day}
      </span>
      <div className="mt-1 space-y-1">
        {tasks.map(task => (
          <CalendarTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}