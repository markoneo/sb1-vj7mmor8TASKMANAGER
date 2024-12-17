import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/task';
import { supabase } from '../lib/supabase';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .order('datetime', { ascending: true });

      if (fetchError) throw fetchError;

      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('tasks_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks'
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTasks]);

  const addTask = useCallback(async (taskInput: {
    title: string;
    description: string;
    datetime: string;
    assignee: string;
  }) => {
    try {
      const { error: insertError } = await supabase
        .from('tasks')
        .insert([{
          ...taskInput,
          completed: false
        }]);

      if (insertError) throw insertError;
      await fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err instanceof Error ? err.message : 'Failed to add task');
    }
  }, [fetchTasks]);

  const updateTask = useCallback(async (taskId: string, updates: Partial<Task>) => {
    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId);

      if (updateError) throw updateError;
      await fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  }, [fetchTasks]);

  const completeTask = useCallback(async (taskId: string) => {
    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ completed: true })
        .eq('id', taskId);

      if (updateError) throw updateError;
      await fetchTasks();
    } catch (err) {
      console.error('Error completing task:', err);
      setError(err instanceof Error ? err.message : 'Failed to complete task');
    }
  }, [fetchTasks]);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (deleteError) throw deleteError;
      await fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    completeTask,
    deleteTask
  };
}