import React from 'react';
import { CheckCircle2, Trash2, Calendar, Edit2, User } from 'lucide-react';
import { Task } from '../../types/task';

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onComplete, onDelete, onEdit }: TaskItemProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const isOverdue = new Date(task.datetime) < new Date() && !task.completed;

  return (
    <div className={`
      p-4 rounded-lg border ${task.completed 
        ? 'bg-green-50 border-green-200'
        : isOverdue
          ? 'bg-red-50 border-red-200'
          : 'bg-white border-gray-200'
      }
    `}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(task.datetime)}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {task.assignee}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          {!task.completed && (
            <button
              onClick={() => onComplete(task.id)}
              className="p-2 text-green-600 hover:bg-green-100 rounded-full"
            >
              <CheckCircle2 className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}