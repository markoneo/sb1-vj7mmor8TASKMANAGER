import React from 'react';
import { Task } from '../../types/task';

interface CalendarTaskProps {
  task: Task;
}

export function CalendarTask({ task }: CalendarTaskProps) {
  const isFuture = new Date(task.datetime) > new Date();
  
  return (
    <div
      className={`
        text-xs p-1 rounded truncate
        ${task.completed 
          ? 'bg-green-100 text-green-800 border border-green-200'
          : isFuture
            ? 'bg-red-100 text-red-800 border border-red-200'
            : 'bg-gray-100 text-gray-800 border border-gray-200'
        }
      `}
      title={`${task.title} - ${task.assignee}`}
    >
      {task.title}
    </div>
  );
}