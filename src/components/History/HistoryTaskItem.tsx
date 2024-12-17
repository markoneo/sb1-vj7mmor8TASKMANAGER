import React from 'react';
import { Trash2, Calendar, User, CheckCircle } from 'lucide-react';
import { Task } from '../../types/task';
import { formatDateTime } from '../../utils/taskUtils';

interface HistoryTaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

export function HistoryTaskItem({ task, onDelete }: HistoryTaskItemProps) {
  return (
    <div className="p-4 rounded-lg border bg-gray-50 border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDateTime(task.datetime)}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {task.assignee}
            </div>
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
          aria-label="Delete task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}