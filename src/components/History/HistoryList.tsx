import React from 'react';
import { Task } from '../../types/task';
import { HistoryTaskItem } from './HistoryTaskItem';
import { groupTasksByDate } from '../../utils/taskUtils';

interface HistoryListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
}

export function HistoryList({ tasks, onDelete }: HistoryListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No completed tasks in history
      </div>
    );
  }

  const groupedTasks = groupTasksByDate(tasks);

  return (
    <div className="space-y-6">
      {Object.entries(groupedTasks).map(([date, dateTasks]) => (
        <div key={date}>
          <h3 className="text-lg font-medium text-gray-900 mb-3">{date}</h3>
          <div className="space-y-3">
            {dateTasks.map(task => (
              <HistoryTaskItem
                key={task.id}
                task={task}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}