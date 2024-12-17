import React from 'react';
import { Task } from '../../types/task';
import { TaskItem } from './TaskItem';
import { groupTasksByDate } from '../../utils/taskUtils';

interface TaskListProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskList({ tasks, onComplete, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found
      </div>
    );
  }

  const groupedTasks = groupTasksByDate(tasks);
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <div className="space-y-6">
      {sortedDates.map(date => (
        <div key={date} className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
            <span>{date}</span>
            <span className="text-sm text-gray-500">
              ({groupedTasks[date].length} {groupedTasks[date].length === 1 ? 'task' : 'tasks'})
            </span>
          </h3>
          <div className="space-y-3">
            {groupedTasks[date].map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={onComplete}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}