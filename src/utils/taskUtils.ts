import { Task } from '../types/task';

export function sortTasksByDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateA.getTime() - dateB.getTime();
  });
}

export function groupTasksByDate(tasks: Task[]): { [key: string]: Task[] } {
  // First sort all tasks by date and time
  const sortedTasks = sortTasksByDate(tasks);
  
  // Then group them by date
  const grouped = sortedTasks.reduce((acc, task) => {
    const date = new Date(task.datetime).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as { [key: string]: Task[] });

  // Sort tasks within each group by time
  Object.keys(grouped).forEach(date => {
    grouped[date].sort((a, b) => {
      const timeA = new Date(a.datetime).getTime();
      const timeB = new Date(b.datetime).getTime();
      return timeA - timeB;
    });
  });

  return grouped;
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function isTaskOverdue(task: Task): boolean {
  return new Date(task.datetime) < new Date() && !task.completed;
}

export function getTaskStatus(task: Task): 'completed' | 'overdue' | 'upcoming' {
  if (task.completed) return 'completed';
  return new Date(task.datetime) < new Date() ? 'overdue' : 'upcoming';
}